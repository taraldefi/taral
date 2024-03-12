// Generated with util/create-component.js
import React from 'react';

import {
	SmallLoanCardProps,
	LargeLoanCardProps,
	LoanCardTypes,
	PaymentSuccessCardProps,
} from './LoanCard.types';

import './LoanCard.scss';
import Button from '../Button';

const rightContainer = (type: LoanCardTypes) => {
	switch (type.toUpperCase()) {
		case 'INTEREST_RATE':
			return <span className='right--container'>Equivalent APR</span>;
		case 'INTEREST_ACCRUED':
			return (
				<div className='right--container'>
					<span>Interest Accrued</span>
					<span>(USD-StableCoin)</span>
				</div>
			);
		case 'TOTAL_REPAYMENT':
			return (
				<div className='right--container'>
					<span>Total Repayments</span>
					<span>(USD-StableCoin)</span>
				</div>
			);
		case 'DUE_DATE':
			return (
				<span className='right--container'>
					Next Instalment Due Date
				</span>
			);
		default:
			return <></>;
	}
};

export const SmallLoanCard: React.FC<SmallLoanCardProps> = ({
	type,
	value,
}) => (
	<div data-testid='LoanCard' className='small--loan--card'>
		<span className='left--container'>{value}</span>
		{rightContainer(type)}
	</div>
);

export const LargeLoanCard: React.FC<LargeLoanCardProps> = ({
	type,
	value,
}) => (
	<div data-testid='LoanCard' className='large--loan--card'>
		<div className='loan--card--container'>
			<span>{value}</span>
			<p>USD-Stablecoin</p>
		</div>
		<span>
			{type == 'LOAN_AMT' ? 'Loan Amount' : 'Outstanding Balance'}
		</span>
	</div>
);

export const PaymentSuccessCard: React.FC<PaymentSuccessCardProps> = ({
	onPrint,
	onBack,
	paymentDetails,
}) => (
	<div className='payment--success--card'>
		<h1>Payment Successful!</h1>
		<span>
			Your payment transaction was successful. Thanks for using Tariala.
		</span>
		<div className='content--container'>
			<div className='content--left'>
				<span>Payment Amount</span>
				<span>Payment Method</span>
				<span>Transaction Date</span>
			</div>
			<div className='content--right'>
				<span>{paymentDetails.amount}</span>
				<span>{paymentDetails.method}</span>
				<span>{paymentDetails.date}</span>
			</div>
		</div>

		<div className='two--button--container'>
			<Button
				label='PRINT RECEIPT'
				onClick={() => {
					onPrint();
				}}
			></Button>
			<Button
				label='BACK HOME'
				onClick={() => {
					onBack();
				}}
			></Button>
		</div>
	</div>
);
