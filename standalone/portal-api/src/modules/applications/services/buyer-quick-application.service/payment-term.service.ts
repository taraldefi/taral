import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePaymentTermDto } from 'src/modules/payment-term/dto/request/create-payment-term.dto';
import { PaymentTermEntity } from 'src/modules/payment-term/models/payment-term.entity';
import { PaymentTermService } from 'src/modules/payment-term/services/payment-term.service';
import { BuyerQuickApplicationEntity } from '../../models/buyer-quickapplication.entity';
import { BuyerQuickApplicationEntityRepository } from '../../repositories/buyer.quickapplication.repository';
import { UpdatePaymentTermDto } from 'src/modules/payment-term/dto/request/update-payment-term.dto';
import { GetPaymentTermResponse } from 'src/modules/payment-term/dto/response/get-payment-term.response.dto';
import { PaymentTermMappingService } from 'src/modules/payment-term/services/mapping.service';

@Injectable()
export class BuyerQuickApplicationPaymentTermService {
  constructor(
    @InjectRepository(BuyerQuickApplicationEntity)
    private buyerApplicationRepository: BuyerQuickApplicationEntityRepository,
    private readonly paymentTermService: PaymentTermService,
    private readonly mappingService: PaymentTermMappingService,
  ) {}

  public async getPaymentTerm(applicationId: string) {
    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['paymentTerms'],
      },
    );
    return await this.paymentTermService.get(application.paymentTerms.id);
  }

  public async createPaymentTerm(
    data: CreatePaymentTermDto,
    applicationId: string,
  ): Promise<GetPaymentTermResponse> {
    const savedPaymentTerm = await this.paymentTermService.create(data);
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
    application.paymentTerms = savedPaymentTerm;
    application.save();

    return this.mappingService.mapPaymentTermDetails(savedPaymentTerm);
  }

  public async updatePaymentTerm(
    data: UpdatePaymentTermDto,
    applicationId: string,
  ): Promise<GetPaymentTermResponse> {
    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['paymentTerms'],
      },
    );
    const savedCollateral = await this.paymentTermService.update(
      application.paymentTerms.id,
      data,
    );

    return savedCollateral;
  }
}
