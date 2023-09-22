import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionDocEntity } from '../models/transaction-documents.entity';
import { TransactionDocRepository } from '../repositories/transaction-documents.repository';
import { FilesService } from 'src/modules/files/services/files.service';
import { CreateTransactionDocumentDto } from '../dto/request/create-transaction-document.dto';
import { CreateTransactionDocumentResponse } from '../dto/response/create-transaction-document-response.dto';
import { AuthenticationService } from 'src/modules/files/services/onchain/authentication.service';
import { CreateFileResponse } from 'src/modules/files/dto/create-file-response.dto';

@Injectable()
export class TransactionDocService {
  constructor(
    @InjectRepository(TransactionDocEntity)
    private transactionDocRepository: TransactionDocRepository,
    private fileService: FilesService,
    private authenticationService: AuthenticationService,
  ) {}

  private CreateTransactionDocumentResponse(
    confirmationDocument: CreateFileResponse,
    additionalDocument: CreateFileResponse,
  ): CreateTransactionDocumentResponse {
    const result = new CreateTransactionDocumentResponse();
    result.confirmationDocument = confirmationDocument;
    result.additionalDocument = additionalDocument;
    return result;
  }

  async createTransactionDoc(
    data: CreateTransactionDocumentDto,
  ): Promise<CreateTransactionDocumentResponse> {
    const confirmationDocSignatureResult = this.authenticationService.guard(
      data.confirmationDocument.signature,
      data.confirmationDocument.signedMessage,
    );

    const additionalDocSignatureResult = this.authenticationService.guard(
      data.additionalDocument.signature,
      data.additionalDocument.signedMessage,
    );

    const confirmationDocument = await this.fileService.createFile(
      data.confirmationDocument,
      confirmationDocSignatureResult,
    );

    const additionalDocument = await this.fileService.createFile(
      data.additionalDocument,
      additionalDocSignatureResult,
    );
    const documents = new TransactionDocEntity();

    documents.confirmationDocument = confirmationDocument.id;
    documents.additionalDocument = additionalDocument.id;

    await this.transactionDocRepository.save(documents);
    return this.CreateTransactionDocumentResponse(
      confirmationDocument,
      additionalDocument,
    );
  }
}
