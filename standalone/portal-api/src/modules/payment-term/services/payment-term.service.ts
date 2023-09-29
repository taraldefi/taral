import { Injectable } from '@nestjs/common';
import { CreatePaymentTermDto } from '../dto/request/create-payment-term.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentTermEntity } from '../models/payment-term.entity';
import { PaymentTermRepository } from '../repositories/payment-term.repository';
import { GetPaymentTermResponse } from '../dto/response/get-payment-term.response.dto';
import { PaymentTermMappingService } from './mapping.service';
import { UpdatePaymentTermDto } from '../dto/request/update-payment-term.dto';

@Injectable()
export class PaymentTermService {
  constructor(
    @InjectRepository(PaymentTermEntity)
    private paymentTermRepository: PaymentTermRepository,
    private paymentTermMappingService: PaymentTermMappingService,
  ) {}

  async create(data: CreatePaymentTermDto): Promise<GetPaymentTermResponse> {
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
    return this.paymentTermMappingService.mapPaymentTermDetails(
      savedPaymentTerm,
    );
  }
  async get(id: string): Promise<GetPaymentTermResponse> {
    const paymentTerm = await this.paymentTermRepository.findOneOrFail(id);
    return this.paymentTermMappingService.mapPaymentTermDetails(paymentTerm);
  }

  async update(
    id: string,
    data: UpdatePaymentTermDto,
  ): Promise<GetPaymentTermResponse> {
    const paymentTerm = await this.paymentTermRepository.findOneOrFail(id);

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

  async delete(id: string) {
    const paymentTerm = await this.paymentTermRepository.findOneOrFail(id);
    await this.paymentTermRepository.delete({ id: id });
  }

  async getAll(): Promise<GetPaymentTermResponse[]> {
    const paymentTerms = await this.paymentTermRepository.find();
    return paymentTerms.map((paymentTerm) => {
      return this.paymentTermMappingService.mapPaymentTermDetails(paymentTerm);
    });
  }
}
