export interface CreatePaymentTerm {
  isConcluded: boolean;
  partialRefinancing: boolean;
  interestExists: boolean;
  interestPercentage: string | null;
  interestCurrency: string | null;
  interestType: InterestType;
  interestFixedRate: string | null;
  interestDegressiveRate: string | null;
  paymentType: PaymentTypes;
  paymentDuration: string;
}

export interface GetPaymentTermResponse {
  id: string;
  isConcluded: boolean;
  partialRefinancing: boolean;
  interestExists: boolean;
  interestPercentage: string;
  interestCurrency: string;
  interestType: InterestType;
  interestFixedRate: string | null;
  interestDegressiveRate: string | null;
  paymentType: PaymentTypes;
  paymentDuration: string;
}

export enum InterestType {
  FIXED = "FIXED",
  DEGRESSIVE = "DEGRESSIVE",
  NONE = "NONE",
}

export enum PaymentTypes {
  SHORT = "SHORT",
  MEDIUM = "MEDIUM",
  SHORT_MEDIUM = "SHORT_MEDIUM",
}