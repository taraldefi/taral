import {
  HttpException,
  HttpStatus,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from '../entities/file.entity';
import { CreateFileDataDto } from '../dto/create-file-data.dto';
import * as crypto from 'crypto';
import { FileVersionEntity } from '../entities/file-version.entity';
import { Storage } from '../../core/modules/storage';
import { CreateFileResponse } from '../dto/create-file-response.dto';
import { v4 as uuidv4 } from 'uuid';
import {
  runOnTransactionComplete,
  runOnTransactionRollback,
  Transactional,
} from 'src/core/modules/transaction';
import { FileVersionRepository } from '../repositories/file-version.repository';
import { FileRepository } from '../repositories/file.repository';
import { UpdateFileDataDto } from '../dto/update-file-data.dto';
import { UpdateFileResponse } from '../dto/update-file-response.dto';
import { RequestFileInfo } from '../dto/request-file-info.dto';
import { OnChainService } from './onchain/on-chain.service';
import { EncryptionService } from './onchain/encryption.service';
import { SignatureVerificationModel } from '../models/signature-verification.model';
import { RequestFileDataDto } from '../dto/request-file-data.dto';
import fs, { ReadStream } from 'fs';
import { RequestFileModel } from '../models/request-file.model';
import { FileParticipantEntity } from '../entities/file-participant.entity';
import { FileParticipantRepository } from '../repositories/file-participant.repository';
import { SignatureService } from './onchain/signature.service';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: FileRepository,

    @InjectRepository(FileVersionEntity)
    private fileVersionsRepository: FileVersionRepository,

    @InjectRepository(FileParticipantEntity)
    private fileParticipantRepository: FileParticipantRepository,

    private onChainService: OnChainService,

    private encryptionService: EncryptionService,

    private signatureService: SignatureService
  ) {}

  async getLatestFileVersion(fileEntity: FileEntity): Promise<RequestFileInfo> {
    const sortedFileVersions = this.sortFileVersionsByDate(fileEntity.versions);

    const lastFileVersion = sortedFileVersions.slice(-1);

    return {
      name: fileEntity.original_name,
      path: lastFileVersion[0].path,
    };
  }

  async requestFile(
    data: RequestFileDataDto,
    signature: SignatureVerificationModel,
  ): Promise<RequestFileModel> {
    if (!data.externalId) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            externalId: 'external-id-missing',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const fileEntity = await this.fileRepository.findOneOrFail({
      relations: ['versions', 'participants'],
      where: { id: data.externalId },
    });

    if (!fileEntity || !fileEntity.versions) return null;

    const fileVersion = await this.getLatestFileVersion(fileEntity);

    const now = new Date();

    if (
      !fileEntity.participants.some(
        (participant) => participant.publicKey == signature.publicKey,
      )
    ) {
      const fileParticipant = await this.createFileParticipant(
        now,
        signature.publicKey,
        signature.address
      );

      (fileEntity.participants || []).push(fileParticipant);
    }

    const fileStream = fs.readFileSync(fileVersion.path);

    const encryptedForConsume =
      await this.encryptionService.decryptAndEncryptBack(
        fileStream,
        signature.publicKey,
      );

    const file = ReadStream.from(encryptedForConsume);

    return {
      file: new StreamableFile(file),
      name: fileVersion.name,
    };
  }

  async updateFile(
    file: UpdateFileDataDto,
    signature: SignatureVerificationModel,
  ): Promise<UpdateFileResponse> {
    if (!file || !file.newFile) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: 'selectFile',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!file.id) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            externalId: 'external-id-missing',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    var canUpdate = await this.onChainService.canWrite(
      file.id,
      signature.address,
    );

    if (!canUpdate) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            externalId: 'no-rights-on-chain',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const onDiskFilename = `${uuidv4()}.pdf`;
    const storage = Storage.disk('files');

    const now = new Date();
    const fileBuffer = file.newFile.buffer;
    const fileName = file.newFile.originalName;

    const fileHash = this.createFileHash(fileBuffer);

    const encryptedFileBuffer = await this.encryptionService.encryptForStorage(
      fileBuffer,
    );

    const storageResponse = await storage.put(
      onDiskFilename,
      encryptedFileBuffer,
    );

    await this.updateFileEntity(
      now,
      fileHash,
      storageResponse.path,
      onDiskFilename,
      file.id,
      signature.publicKey,
      signature.address
    );

    const signedFileHash = this.signatureService.signMessage(fileHash);

    return this.createFileResponse(fileName, fileHash, file.id, signedFileHash);
  }

  async createFile(
    file: CreateFileDataDto,
    signature: SignatureVerificationModel,
  ): Promise<CreateFileResponse> {
    if (!file || !file.file) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: 'selectFile',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const onDiskFilename = `${uuidv4()}.pdf`;
    const storage = Storage.disk('files');

    const now = new Date();
    const fileBuffer = file.file.buffer;
    const fileName = file.file.originalName;

    const fileHash = this.createFileHash(fileBuffer);

    const encryptedFileBuffer = await this.encryptionService.encryptForStorage(
      fileBuffer,
    );

    const storageResponse = await storage.put(
      onDiskFilename,
      encryptedFileBuffer,
    );

    var savedFileId = await this.saveFileEntity(
      now,
      fileHash,
      storageResponse.path,
      fileName,
      onDiskFilename,
      signature.publicKey,
      signature.address
    );

    const signedFileHash = this.signatureService.signMessage(fileHash);

    return this.createFileResponse(fileName, fileHash, savedFileId, signedFileHash);
  }

  @Transactional()
  private async updateFileEntity(
    now: Date,
    fileHash: string,
    path: string,
    onDiskName: string,
    externalFileId: number,
    participantPublicKey: string,
    participantWallet: string
  ): Promise<void> {
    runOnTransactionRollback((cb) =>
      console.log('Rollback error ' + cb.message),
    );

    runOnTransactionComplete((cb) => console.log('Transaction Complete'));

    const fileEntity = await this.fileRepository.findOneOrFail({
      relations: ['versions', 'participants'],
      where: { id: externalFileId },
    });

    const fileVersionEntity = await this.createFileVersion(
      now,
      fileHash,
      path,
      onDiskName,
    );

    if (
      !fileEntity.participants.some(
        (participant) => participant.publicKey == participantPublicKey,
      )
    ) {
      const fileParticipant = await this.createFileParticipant(
        now,
        participantPublicKey,
        participantWallet
      );

      (fileEntity.participants || []).push(fileParticipant);
    }

    (fileEntity.versions || []).push(fileVersionEntity);
    await this.fileRepository.save(fileEntity);
  }

  @Transactional() // Will open a transaction if one doesn't already exist
  private async saveFileEntity(
    now: Date,
    fileHash: string,
    path: string,
    fileName: string,
    onDiskName: string,
    participantPublicKey: string,
    participantWallet: string
  ): Promise<number> {
    runOnTransactionRollback((cb) =>
      console.log('Rollback error ' + cb.message),
    );

    runOnTransactionComplete((cb) => console.log('Transaction Complete'));

    const fileVersionEntity = await this.createFileVersion(
      now,
      fileHash,
      path,
      onDiskName,
    );

    const fileParticipant = await this.createFileParticipant(
      now,
      participantPublicKey,
      participantWallet
    );

    const fileEntity = new FileEntity();

    fileEntity.original_name = fileName;
    fileEntity.created = now;
    fileEntity.last_updated = now;
    fileEntity.versions = [fileVersionEntity];
    fileEntity.participants = [fileParticipant];

    fileVersionEntity.file = fileEntity;

    var result = await this.fileRepository.save(fileEntity);
    return result.id;
  }

  private async createFileParticipant(
    now: Date,
    publicKey: string,
    wallet: string
  ): Promise<FileParticipantEntity> {
    const fileParticipant = new FileParticipantEntity();
    fileParticipant.created = now;
    fileParticipant.publicKey = publicKey;
    fileParticipant.wallet = wallet;

    var result = await this.fileParticipantRepository.save(fileParticipant);

    return result;
  }

  private async createFileVersion(
    now: Date,
    fileHash: string,
    path: string,
    fileNameOnDisk: string,
  ): Promise<FileVersionEntity> {
    const fileVersionEntity = new FileVersionEntity();

    fileVersionEntity.created = now;
    fileVersionEntity.hash = fileHash;
    fileVersionEntity.on_disk_name = fileNameOnDisk;
    fileVersionEntity.path = path;

    await this.fileVersionsRepository.save(fileVersionEntity);
    return fileVersionEntity;
  }

  private createFileResponse(
    fileName: string,
    fileHash: string,
    id: number,
    signedHash: string
  ): CreateFileResponse {
    const result = new CreateFileResponse();

    result.hash = fileHash;
    result.name = fileName;
    result.id = id;
    result.signedHash = signedHash;

    return result;
  }

  private createFileHash(fileBuffer: Buffer): string {
    const hashSum = crypto.createHash('sha256');

    hashSum.update(fileBuffer);
    const fileHash = hashSum.digest('hex');

    return fileHash;
  }

  private getTime(date?: Date): number {
    return date != null ? date.getTime() : 0;
  }

  private sortFileVersionsByDate(
    fileVersions: FileVersionEntity[],
  ): FileVersionEntity[] {
    return fileVersions.sort((a: FileVersionEntity, b: FileVersionEntity) => {
      return this.getTime(a.created) - this.getTime(b.created);
    });
  }
}
