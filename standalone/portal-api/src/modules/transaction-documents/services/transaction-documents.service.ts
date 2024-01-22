import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuickApplicationEntity } from 'src/modules/applications/models/quickapplication.entity';
import { BuyerQuickApplicationEntityRepository } from 'src/modules/applications/repositories/buyer.quickapplication.repository';
import { TransactionDocumentEntity } from '../models/transaction-documents.entity';
import { TransactionDocumentRepository } from '../repositories/transaction-documents.repository';

@Injectable()
export class TransactionDocumentService {
  constructor(
    @InjectRepository(TransactionDocumentEntity)
    private transactionDocumentRepository: TransactionDocumentRepository,

    @InjectRepository(QuickApplicationEntity)
    private buyerApplicationRepository: BuyerQuickApplicationEntityRepository,
  ) {}

  public async checkIfConfirmationDocumentExists(
    applicationId: string,
  ): Promise<boolean> {
    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['transactionDocuments'],
      },
    );

    if (application.transactionDocuments) {
      return application.transactionDocuments.confirmationDocument;
    }

    return false;
  }

  public async checkIfAdditionalDocumentExists(
    applicationId: string,
  ): Promise<boolean> {
    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['transactionDocuments'],
      },
    );

    if (application.transactionDocuments) {
      return application.transactionDocuments.additionalDocument;
    }

    return false;
  }

  public async markConfirmationDocumentUploaded(
    applicationId: string,
  ): Promise<string> {
    console.log('markConfirmationDocumentUploaded', applicationId);
    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['transactionDocuments'],
      },
    );

    let transactionDocument = application.transactionDocuments;

    if (!transactionDocument) {
      transactionDocument = new TransactionDocumentEntity();
    }

    transactionDocument.confirmationDocument = true;
    const savedTxDoc = await this.transactionDocumentRepository.save(
      transactionDocument,
    );
    application.transactionDocuments = savedTxDoc;
    application.save();

    return transactionDocument.id;
  }

  public async markAdditionalDocumentUploaded(
    applicationId: string,
  ): Promise<string> {
    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['transactionDocuments'],
      },
    );

    let transactionDocument = application.transactionDocuments;

    if (!transactionDocument) {
      transactionDocument = new TransactionDocumentEntity();
    }

    transactionDocument.additionalDocument = true;
    const savedTxDoc = await this.transactionDocumentRepository.save(
      transactionDocument,
    );
    application.transactionDocuments = savedTxDoc;
    application.save();

    return transactionDocument.id;
  }
}
