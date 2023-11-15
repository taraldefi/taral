import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePaymentTermDto } from 'src/modules/payment-term/dto/request/create-payment-term.dto';
import { PaymentTermService } from 'src/modules/payment-term/services/payment-term.service';
import { QuickApplicationEntity } from '../../models/quickapplication.entity';
import { BuyerQuickApplicationEntityRepository } from '../../repositories/buyer.quickapplication.repository';
import { UpdatePaymentTermDto } from 'src/modules/payment-term/dto/request/update-payment-term.dto';
import { GetPaymentTermResponse } from 'src/modules/payment-term/dto/response/get-payment-term.response.dto';
import { PaymentTermMappingService } from 'src/modules/payment-term/services/mapping.service';
import { BaseService } from 'src/common/services/base.service';
import { IsolationLevel, Transactional } from 'src/common/transaction';

@Injectable()
export class BuyerQuickApplicationPaymentTermService extends BaseService {
  constructor(
    @InjectRepository(QuickApplicationEntity)
    private buyerApplicationRepository: BuyerQuickApplicationEntityRepository,
    private readonly paymentTermService: PaymentTermService,
    private readonly mappingService: PaymentTermMappingService,
  ) {
    super();
  }

  public async getPaymentTerm(applicationId: string) {
    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['paymentTerms'],
      },
    );
    return await this.paymentTermService.get(application.paymentTerms.id);
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async createPaymentTerm(
    data: CreatePaymentTermDto,
    applicationId: string,
  ): Promise<GetPaymentTermResponse> {
    this.setupTransactionHooks();

    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: [
          'buyerInformation',
          'supplierInformation',
          'paymentTerms',
          'orderDetails',
          'security',
          'transactionDocuments',
        ],
      },
    );

    if (application.paymentTerms) {
      throw new HttpException(
        'payment terms already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const savedPaymentTerm = await this.paymentTermService.create(data);

    const newEndDate = new Date(
      application.issuanceDate.getMilliseconds() +
        parseInt(savedPaymentTerm.paymentDuration) * 24 * 60 * 60 * 1000,
    );
    application.endDate = newEndDate;
    application.paymentTerms = savedPaymentTerm;
    application.save();

    return this.mappingService.mapPaymentTermDetails(savedPaymentTerm);
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async updatePaymentTerm(
    data: UpdatePaymentTermDto,
    applicationId: string,
  ): Promise<GetPaymentTermResponse> {
    this.setupTransactionHooks();

    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['paymentTerms'],
      },
    );
    const savedPaymentTerm = await this.paymentTermService.update(
      application.paymentTerms.id,
      data,
    );
    const newEndDate = new Date(
      application.issuanceDate.getMilliseconds() +
        parseInt(savedPaymentTerm.paymentDuration) * 24 * 60 * 60 * 1000,
    );
    application.endDate = newEndDate;
    application.save();

    return savedPaymentTerm;
  }
}
