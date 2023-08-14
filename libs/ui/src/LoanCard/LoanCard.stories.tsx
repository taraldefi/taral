// Generated with util/create-component.js
import React from 'react';
import { LargeLoanCard, PaymentSuccessCard, SmallLoanCard } from './LoanCard';
import { LoanCardTypes } from './LoanCard.types';

export default {
  title: 'LoanCard',
};

export const interestRate = () => (
  <SmallLoanCard value="6.5%" type={LoanCardTypes.INTEREST_RATE} />
);

export const interestAccrued = () => (
  <SmallLoanCard value="12,345.67" type={LoanCardTypes.INTEREST_ACCRUED} />
);

export const totalRepayment = () => (
  <SmallLoanCard value="17,580.23" type={LoanCardTypes.TOTAL_REPAYMENT} />
);

export const dueDate = () => (
  <SmallLoanCard value="May 20th" type={LoanCardTypes.DUE_DATE} />
);

export const loanAmount = () => (
  <LargeLoanCard type={LoanCardTypes.LOAN_AMT} value="15,000.00" />
);

export const outstandingAmount = () => (
  <LargeLoanCard type={LoanCardTypes.OUTSTANDING_AMT} value="12,345.67" />
);

export const paymentSuccess = () => (
  <PaymentSuccessCard
    onPrint={() => {}}
    onBack={() => {}}
    paymentDetails={{
      amount: 2000,
      date: 'March 19, 2023',
      method: 'USD-Stablecoin',
    }}
  ></PaymentSuccessCard>
);
