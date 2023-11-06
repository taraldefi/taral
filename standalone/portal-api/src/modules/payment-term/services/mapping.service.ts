import { Injectable } from '@nestjs/common';
import { GetPaymentTermResponse } from '../dto/response/get-payment-term.response.dto';
import { PaymentTermEntity } from '../models/payment-term.entity';
import { interestTypes } from '../enums/payment-term-type.enum';

@Injectable()
export class PaymentTermMappingService {
  public mapPaymentTermDetails(
    paymentTerm: PaymentTermEntity,
  ): GetPaymentTermResponse {
    var response = new GetPaymentTermResponse();

    response.id = paymentTerm.id;
    response.isConcluded = paymentTerm.isConcluded;
    response.partialRefinancing = paymentTerm.partialRefinancing;
    response.interestExists = false;
    response.interestCurrency = paymentTerm.interestCurrency;
    response.interestPercentage = paymentTerm.interestPercentage;
    response.interestType = interestTypes.NONE;
    if (paymentTerm.interestCurrency || paymentTerm.interestPercentage) {
      response.interestExists = true;
    }
    response.interestFixedRate = paymentTerm.interestFixedRate;
    if (!paymentTerm.interestFixedRate) {
      response.interestType = interestTypes.DEGRESSIVE;
    }
    response.interestDegressiveRate = paymentTerm.interestDegressiveRate;
    if (!paymentTerm.interestDegressiveRate) {
      response.interestType = interestTypes.FIXED;
    }
    if (!paymentTerm.interestFixedRate && !paymentTerm.interestDegressiveRate) {
      response.interestType = interestTypes.NONE;
    }
    response.downpaymentCurrency = paymentTerm.downpaymentCurrency;
    response.downpaymentAmount = paymentTerm.downpaymentAmount;
    response.downpaymentDescription = paymentTerm.downpaymentDescription;
    response.balanceCurrency = paymentTerm.balanceCurrency;
    response.balanceAmount = paymentTerm.balanceAmount;
    response.balancePaymentDeadline = paymentTerm.balancePaymentDeadline;
    response.paymentVehicleDescription = paymentTerm.paymentVehicleDescription;
    response.paymentType = paymentTerm.paymentType;
    response.paymentDuration = paymentTerm.paymentDuration;

    return response;
  }
}
