import { Injectable } from '@nestjs/common';
import { CreatePaymentTermDto } from '../dto/request/create-payment-term.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentTermEntity } from '../models/payment-term.entity';
import { PaymentTermRepository } from '../repositories/payment-term.repository';
import { GetPaymentTermResponse } from '../dto/response/get-payment-term.response.dto';
import { PaymentTermMappingService } from './mapping.service';
import { UpdatePaymentTermDto } from '../dto/request/update-payment-term.dto';
import { triggerError } from 'src/common/trigger.error';

@Injectable()
export class PaymentTermService {
  constructor(
    @InjectRepository(PaymentTermEntity)
    private paymentTermRepository: PaymentTermRepository,
    private paymentTermMappingService: PaymentTermMappingService,
  ) {}

  public async create(data: CreatePaymentTermDto): Promise<PaymentTermEntity> {
    const paymentTerm = new PaymentTermEntity();

    paymentTerm.isConcluded = data.isConcluded;
    paymentTerm.partialRefinancing = data.partialRefinancing;
    paymentTerm.interestCurrency = data.interestCurrency;
    paymentTerm.interestPercentage = data.interestPercentage;
    paymentTerm.interestFixedRate = data.interestFixedRate;
    paymentTerm.interestRegressiveRate = data.interestRegressiveRate;
    paymentTerm.paymentType = data.paymentType;
    paymentTerm.paymentDuration = data.paymentDuration;

    const savedPaymentTerm = await this.paymentTermRepository.save(paymentTerm);

    return savedPaymentTerm;
  }
  public async get(id: string): Promise<GetPaymentTermResponse> {
    if (!id) throw triggerError('missing-entity-id');

    const paymentTerm = await this.paymentTermRepository.findOne(id);

    if (!paymentTerm) throw triggerError('entity-not-found');

    return this.paymentTermMappingService.mapPaymentTermDetails(paymentTerm);
  }

  public async update(
    id: string,
    data: UpdatePaymentTermDto,
  ): Promise<GetPaymentTermResponse> {
    if (!id) throw triggerError('missing-entity-id');

    const paymentTerm = await this.paymentTermRepository.findOne(id);

    if (!paymentTerm) throw triggerError('entity-not-found');

    paymentTerm.isConcluded = data.isConcluded || false;
    paymentTerm.partialRefinancing = data.partialRefinancing || false;

    if (data.interestCurrency) {
      paymentTerm.interestCurrency = data.interestCurrency;
    }
    if (data.interestPercentage) {
      paymentTerm.interestPercentage = data.interestPercentage;
    }
    if (data.interestFixedRate) {
      paymentTerm.interestFixedRate = data.interestFixedRate;
    }
    if (data.interestRegressiveRate) {
      paymentTerm.interestRegressiveRate = data.interestRegressiveRate;
    }
    if (data.paymentType) {
      paymentTerm.paymentType = data.paymentType;
    }
    if (data.paymentDuration) {
      paymentTerm.paymentDuration = data.paymentDuration;
    }

    const updatedPaymentTerm = await this.paymentTermRepository.save(
      paymentTerm,
    );
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
