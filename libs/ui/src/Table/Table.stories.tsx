// Generated with util/create-component.js
import React from 'react';
import {
	ApplicationTable,
	AuditTable,
	CompanyTable,
	EntityTable,
	OverviewTable,
	PersonsTable,
	QuantitativeTable,
	ReceiptTable,
	RepaymentTable,
	ResearchTable,
	ScreeningTable,
	SignOffTable,
	TaskTable,
	TeamTable,
	TxFinanceTable,
} from './Table';
import {
	ApplicationTableData,
	AuditTableData,
	CompanyTableData,
	EntityTableData,
	OverviewTableData,
	PersonsTableData,
	QuantitativeData,
	ReceiptTableData,
	RepaymentTableData,
	ResearchTableData,
	ScreeningTableData,
	SignoffTabelData,
	TaskTableData,
	TeamTableData,
	TxTableData,
} from './data/data';
export default {
	title: 'Table',
};

export const Application = () => (
	<ApplicationTable applicationTableData={ApplicationTableData} />
);

export const Entity = () => <EntityTable entityTableData={EntityTableData} />;

export const Company = () => (
	<CompanyTable companyTableData={CompanyTableData} />
);

export const Screening = () => (
	<ScreeningTable screeningTableData={ScreeningTableData} />
);

export const Persons = () => (
	<PersonsTable personsTableData={PersonsTableData} />
);

export const Research = () => (
	<ResearchTable researchTableData={ResearchTableData} />
);
export const Signoff = () => (
	<SignOffTable signOffTableData={SignoffTabelData} />
);

export const receipt = () => (
	<ReceiptTable receiptTableData={ReceiptTableData} />
);

export const repayment = () => (
	<RepaymentTable repaymentTableData={RepaymentTableData} />
);

export const overview = () => (
	<OverviewTable overviewTableData={OverviewTableData} />
);

export const audit = () => <AuditTable auditTableData={AuditTableData} />;

export const task = () => (
	<TaskTable taskTableData={TaskTableData} value={TaskTableData.length} />
);

export const team = () => (
	<TeamTable teamTableData={TeamTableData} value={TeamTableData.length} />
);

export const quantitative = () => (
	<QuantitativeTable quantitativeTableData={QuantitativeData} />
);

export const txTable = () => <TxFinanceTable txTableData={TxTableData} />;
