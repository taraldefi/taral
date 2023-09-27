import { Injectable } from '@nestjs/common';
import { GetPaymentTermResponse } from '../dto/response/get-payment-term.response.dto';
import { PaymentTermEntity } from '../models/payment-term.entity';

@Injectable()
export class PaymentTermMappingService {
  public mapPaymentTermDetails(
    paymentTerm: PaymentTermEntity,
  ): GetPaymentTermResponse {
    var response = new GetPaymentTermResponse();

    response.id = paymentTerm.id;
    response.isConcluded = paymentTerm.isConcluded;
    response.partialRefinancing = paymentTerm.partialRefinancing;
    response.interestCurrency = paymentTerm.interestCurrency;
    response.interestPercentage = paymentTerm.interestPercentage;
    response.interestFixedRate = paymentTerm.interestFixedRate;
    response.interestRegressiveRate = paymentTerm.interestRegressiveRate;
    response.paymentType = paymentTerm.paymentType;
    response.paymentDuration = paymentTerm.paymentDuration;

    return response;
  }
}
