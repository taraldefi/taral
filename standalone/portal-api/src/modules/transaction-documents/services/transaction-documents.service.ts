import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuickApplicationEntity } from 'src/modules/applications/models/quickapplication.entity';
import { BuyerQuickApplicationEntityRepository } from 'src/modules/applications/repositories/buyer.quickapplication.repository';
import { TransactionDocumentEntity } from '../models/transaction-documents.entity';
import { TransactionDocumentRepository } from '../repositories/transaction-documents.repository';
import { BaseService } from 'src/common/services/base.service';
import CoreLoggerService from 'src/common/logging/CoreLoggerService';

@Injectable()
export class TransactionDocumentService extends BaseService {
  constructor(
    public logger: CoreLoggerService,
    @InjectRepository(TransactionDocumentEntity)
    private transactionDocumentRepository: TransactionDocumentRepository,

    @InjectRepository(QuickApplicationEntity)
    private buyerApplicationRepository: BuyerQuickApplicationEntityRepository,
  ) {
    super(logger);
  }

  private getDocumentUploadStatus(
    application: QuickApplicationEntity,
    type: string,
  ): boolean {
    switch (type) {
      case 'confirmation-document':
        return application.transactionDocuments.confirmationDocument;
      case 'additional-document':
        return application.transactionDocuments.additionalDocument;
      case 'credit-card-statement':
        return application.transactionDocuments.creditCardStatement;
      default:
        return false;
    }
  }

  private getDocumentKey(type: string): string {
    switch (type) {
      case 'confirmation-document':
        return 'confirmationDocument';
      case 'additional-document':
        return 'additionalDocument';
      case 'credit-card-statement':
        return 'creditCardStatement';
      default:
        return '';
    }
  }

  public async checkIfDocumentExists(
    applicationId: string,
    type: string,
  ): Promise<boolean> {
    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['transactionDocuments'],
      },
    );

    if (application.transactionDocuments) {
      return this.getDocumentUploadStatus(application, type);
    }

    return false;
  }

  public async markDocumentAsUploaded(
    applicationId: string,
    type: string,
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
    const documentType = this.getDocumentKey(type);

    transactionDocument[documentType] = true;
    const savedTxDoc = await this.transactionDocumentRepository.save(
      transactionDocument,
    );
    application.transactionDocuments = savedTxDoc;
    application.save();

    return transactionDocument.id;
  }
}
