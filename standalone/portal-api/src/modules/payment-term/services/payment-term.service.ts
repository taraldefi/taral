import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePaymentTermDto } from '../dto/request/create-payment-term.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentTermEntity } from '../models/payment-term.entity';
import { PaymentTermRepository } from '../repositories/payment-term.repository';
import { GetPaymentTermResponse } from '../dto/response/get-payment-term.response.dto';
import { PaymentTermMappingService } from './mapping.service';
import { UpdatePaymentTermDto } from '../dto/request/update-payment-term.dto';
import { triggerError } from 'src/common/trigger.error';
import { interestTypes } from '../enums/payment-term-type.enum';
import { BaseService } from 'src/common/services/base.service';
import { QuickApplicationEntity } from 'src/modules/applications/models/quickapplication.entity';
import { BuyerQuickApplicationEntityRepository } from 'src/modules/applications/repositories/buyer.quickapplication.repository';
import { IsolationLevel, Transactional } from 'src/common/transaction';
import { ConfigService } from '@nestjs/config';
import CoreLoggerService from 'src/common/logging/CoreLoggerService';

@Injectable()
export class PaymentTermService extends BaseService {
  constructor(
    public configService: ConfigService,
    public logger: CoreLoggerService,
    @InjectRepository(PaymentTermEntity)
    private paymentTermRepository: PaymentTermRepository,
    private paymentTermMappingService: PaymentTermMappingService,
    @InjectRepository(QuickApplicationEntity)
    private buyerApplicationRepository: BuyerQuickApplicationEntityRepository,
  ) {
    super(logger);
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async create(
    data: CreatePaymentTermDto,
    applicationId: string,
  ): Promise<GetPaymentTermResponse> {
    this.setupTransactionHooks();

    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['paymentTerms'],
      },
    );

    if (application.paymentTerms) {
      throw new HttpException(
        'payment terms already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const paymentTerm = new PaymentTermEntity();

    paymentTerm.isConcluded = data.isConcluded;
    paymentTerm.partialRefinancing = data.partialRefinancing;
    paymentTerm.interestCurrency = data.interestCurrency ?? null;
    paymentTerm.interestPercentage = data.interestPercentage ?? null;
    paymentTerm.interestFixedRate = data.interestFixedRate ?? null;
    paymentTerm.interestDegressiveRate = data.interestDegressiveRate ?? null;
    paymentTerm.paymentType = data.paymentType;
    paymentTerm.paymentDuration = data.paymentDuration;
    paymentTerm.downpaymentAmount = data.downpaymentAmount;
    paymentTerm.downpaymentCurrency = data.downpaymentCurrency;
    paymentTerm.downpaymentDescription = data.downpaymentDescription;
    paymentTerm.balanceAmount = data.balanceAmount;
    paymentTerm.balanceCurrency = data.balanceCurrency;
    paymentTerm.balancePaymentDeadline = data.balancePaymentDeadline;
    paymentTerm.paymentVehicleDescription = data.paymentVehicleDescription;

    const savedPaymentTerm = await this.paymentTermRepository.save(paymentTerm);

    const newEndDate = new Date(
      application.issuanceDate.getTime() +
        parseInt(savedPaymentTerm.paymentDuration) * 24 * 60 * 60 * 1000,
    );

    application.endDate = newEndDate;
    application.paymentTerms = savedPaymentTerm;
    application.save();

    return this.paymentTermMappingService.mapPaymentTermDetails(
      savedPaymentTerm,
    );
  }
  public async get(applicationId: string): Promise<GetPaymentTermResponse> {
    if (!applicationId) throw triggerError('missing-entity-id');
    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['paymentTerms'],
      },
    );

    const paymentTerm = await this.paymentTermRepository.findOne(
      application.paymentTerms.id,
    );

    if (!paymentTerm) throw triggerError('entity-not-found');

    return this.paymentTermMappingService.mapPaymentTermDetails(paymentTerm);
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async update(
    applicationId: string,
    data: UpdatePaymentTermDto,
  ): Promise<GetPaymentTermResponse> {
    this.setupTransactionHooks();
    if (!applicationId) throw triggerError('missing-entity-id');

    const application = await this.buyerApplicationRepository.findOne(
      applicationId,
      {
        relations: ['paymentTerms'],
      },
    );

    const paymentTerm = await this.paymentTermRepository.findOne(
      application.paymentTerms.id,
    );

    if (!paymentTerm) throw triggerError('entity-not-found');

    paymentTerm.isConcluded = data.isConcluded || false;
    paymentTerm.partialRefinancing = data.partialRefinancing || false;

    if (data.interestCurrency) {
      paymentTerm.interestCurrency = data.interestCurrency;
    } else {
      paymentTerm.interestCurrency = null;
    }
    if (data.interestPercentage) {
      paymentTerm.interestPercentage = data.interestPercentage;
    } else {
      paymentTerm.interestPercentage = null;
    }
    if (data.interestFixedRate) {
      paymentTerm.interestFixedRate = data.interestFixedRate;
    } else {
      paymentTerm.interestFixedRate = null;
    }
    if (data.interestDegressiveRate) {
      paymentTerm.interestDegressiveRate = data.interestDegressiveRate;
    } else {
      paymentTerm.interestDegressiveRate = null;
    }
    if (data.paymentType) {
      paymentTerm.paymentType = data.paymentType;
    }
    if (data.downpaymentAmount) {
      paymentTerm.downpaymentAmount = data.downpaymentAmount;
    }
    if (data.downpaymentCurrency) {
      paymentTerm.downpaymentCurrency = data.downpaymentCurrency;
    }
    if (data.downpaymentDescription) {
      paymentTerm.downpaymentDescription = data.downpaymentDescription;
    }
    if (data.balanceAmount) {
      paymentTerm.balanceAmount = data.balanceAmount;
    }
    if (data.balanceCurrency) {
      paymentTerm.balanceCurrency = data.balanceCurrency;
    }
    if (data.balancePaymentDeadline) {
      paymentTerm.balancePaymentDeadline = data.balancePaymentDeadline;
    }
    if (data.paymentVehicleDescription) {
      paymentTerm.paymentVehicleDescription = data.paymentVehicleDescription;
    }
    if (data.paymentDuration) {
      paymentTerm.paymentDuration = data.paymentDuration;
    }

    if (data.interestType === interestTypes.FIXED) {
      paymentTerm.interestDegressiveRate = null;
    }
    if (data.interestType === interestTypes.DEGRESSIVE) {
      paymentTerm.interestFixedRate = null;
    }

    const updatedPaymentTerm = await this.paymentTermRepository.save(
      paymentTerm,
    );
    const newEndDate = new Date(
      application.issuanceDate.getTime() +
        parseInt(updatedPaymentTerm.paymentDuration) * 24 * 60 * 60 * 1000,
    );
    application.endDate = newEndDate;
    application.save();
    return this.paymentTermMappingService.mapPaymentTermDetails(
      updatedPaymentTerm,
    );
  }

  public async delete(id: string) {
    if (!id) throw triggerError('missing-entity-id');

    const paymentTerm = await this.paymentTermRepository.findOne(id);

    if (!paymentTerm) throw triggerError('entity-not-found');

    await this.paymentTermRepository.delete({ id: id });
  }

  public async getAll(): Promise<GetPaymentTermResponse[]> {
    const paymentTerms = await this.paymentTermRepository.find();
    return paymentTerms.map((paymentTerm) => {
      return this.paymentTermMappingService.mapPaymentTermDetails(paymentTerm);
    });
  }
}
