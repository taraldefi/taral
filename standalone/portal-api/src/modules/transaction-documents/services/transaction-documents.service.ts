import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFileDataDto } from 'src/modules/files/dto/create-file-data.dto';
import { CreateFileResponse } from 'src/modules/files/dto/create-file-response.dto';
import { FilesService } from 'src/modules/files/services/files.service';
import { AuthenticationService } from 'src/modules/files/services/onchain/authentication.service';
import { TransactionDocumentEntity } from '../models/transaction-documents.entity';
import { TransactionDocumentRepository } from '../repositories/transaction-documents.repository';

@Injectable()
export class TransactionDocumentService {
  constructor(
    @InjectRepository(TransactionDocumentEntity)
    private transactionDocumentRepository: TransactionDocumentRepository,
    private fileService: FilesService,
    private authenticationService: AuthenticationService,
  ) {}

  async createTransactionDocument(
    data: CreateFileDataDto,
  ): Promise<CreateFileResponse> {
    const documentSignatureResult = this.authenticationService.guard(
      data.signature,
      data.signedMessage,
    );
    const { response: documentResponse, savedFileEntity: savedDocumentEntity } =
      await this.fileService.createFile(data, documentSignatureResult);

    const transactionDocument = new TransactionDocumentEntity();

    (transactionDocument.documents || []).push(savedDocumentEntity);

    await this.transactionDocumentRepository.save(transactionDocument);

    return documentResponse;
  }
}
