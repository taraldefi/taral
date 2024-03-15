// Generated with util/create-component.js
export enum LoanCardTypes {
  INTEREST_RATE = "INTEREST_RATE",
  INTEREST_ACCRUED = "INTEREST_ACCRUED",
  TOTAL_REPAYMENT = "TOTAL_REPAYMENT",
  DUE_DATE = "DUE_DATE",
  LOAN_AMT = "LOAN_AMT",
  OUTSTANDING_AMT = "OUTSTANDING_AMT",
}

export interface SmallLoanCardProps {
  type:
    | LoanCardTypes.INTEREST_RATE
    | LoanCardTypes.INTEREST_ACCRUED
    | LoanCardTypes.TOTAL_REPAYMENT
    | LoanCardTypes.DUE_DATE;
  value: string;
}

export interface LargeLoanCardProps {
  type: LoanCardTypes.LOAN_AMT | LoanCardTypes.OUTSTANDING_AMT;
  value: string;
}

interface paymentDetails {
  date: string;
  amount: number;
  method: string;
}

export interface PaymentSuccessCardProps {
  onPrint: () => void;
  onBack: () => void;
  paymentDetails: paymentDetails;
}
