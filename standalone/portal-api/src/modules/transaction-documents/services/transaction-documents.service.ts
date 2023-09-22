import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TxDocEntity } from '../models/transaction-documents.entity';
import { TxDocRepository } from '../repositories/transaction-documents.repository';
import { FilesService } from 'src/modules/files/services/files.service';
import { CreateTxDocDto } from '../dto/request/create-transaction-document.dto';
import { CreateTxDocResponse } from '../dto/response/create-transaction-document-response.dto';
import { AuthenticationService } from 'src/modules/files/services/onchain/authentication.service';
import { CreateFileResponse } from 'src/modules/files/dto/create-file-response.dto';

@Injectable()
export class TxDocService {
  constructor(
    @InjectRepository(TxDocEntity)
    private txDocRepository: TxDocRepository,
    private fileService: FilesService,
    private authenticationService: AuthenticationService,
  ) {}

  private CreateTxDocResponse(
    confirmationDocument: CreateFileResponse,
    additionalDocument: CreateFileResponse,
  ): CreateTxDocResponse {
    const result = new CreateTxDocResponse();
    result.confirmationDocument = confirmationDocument;
    result.additionalDocument = additionalDocument;
    return result;
  }

  async createTxDoc(data: CreateTxDocDto): Promise<CreateTxDocResponse> {
    const confirmationDocSignatureResult = this.authenticationService.guard(
      data.confirmationDocument.signature,
      data.confirmationDocument.signedMessage,
    );

    const additionalDocSignatureResult = this.authenticationService.guard(
      data.additionalDocument.signature,
      data.additionalDocument.signedMessage,
    );

    const {
      response: confirmationDocumentResponse,
      savedFileEntity: confirmationDocumentEntity,
    } = await this.fileService.createFile(
      data.confirmationDocument,
      confirmationDocSignatureResult,
    );

    const {
      response: additionalDocumentResponse,
      savedFileEntity: additionalDocumentEntity,
    } = await this.fileService.createFile(
      data.additionalDocument,
      additionalDocSignatureResult,
    );
    const documents = new TxDocEntity();

    documents.confirmationDocument = confirmationDocumentEntity;
    documents.additionalDocument = additionalDocumentEntity;

    await this.txDocRepository.save(documents);

    return this.CreateTxDocResponse(
      confirmationDocumentResponse,
      additionalDocumentResponse,
    );
  }
}
