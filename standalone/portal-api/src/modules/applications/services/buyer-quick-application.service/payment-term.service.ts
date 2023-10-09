import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePaymentTermDto } from 'src/modules/payment-term/dto/request/create-payment-term.dto';
import { PaymentTermEntity } from 'src/modules/payment-term/models/payment-term.entity';
import { PaymentTermService } from 'src/modules/payment-term/services/payment-term.service';
import { BuyerQuickApplicationEntity } from '../../models/buyer-quickapplication.entity';
import { BuyerQuickApplicationEntityRepository } from '../../repositories/buyer.quickapplication.repository';

@Injectable()
export class BuyerQuickApplicationPaymentTermService {
  constructor(
    @InjectRepository(BuyerQuickApplicationEntity)
    private buyerApplicationRepository: BuyerQuickApplicationEntityRepository,
    private readonly paymentTermService: PaymentTermService,
  ) {}

  public async createPaymentTerm(
    data: CreatePaymentTermDto,
    applicationId: string,
  ): Promise<PaymentTermEntity> {
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

    return savedPaymentTerm;
  }
}
