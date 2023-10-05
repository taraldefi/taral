import FinancialsLayout from "@components/layouts/auditor/financials_layout";
import { ProfitTable } from "@components/widgets/table/profitTable";

const TableData = {
  "2020": {
    revenue: 14234678,
    cogs: 9252541,
    grossProfit: 4982137,
    distributionCosts: 4567,
    AdministrativeCosts: 45158,
    otherIncome: 0,
    OperatingProfit: 4932412,
    financeCosts: 51468,
    profitBeforeIncomeTax: 4880944,
    incomeTaxExpense: 976189,
    profitForThePeriod: 3904755,
    file: "file",
  },
  "2021": {
    revenue: 15569023,
    cogs: 10586936,
    grossProfit: 4982087,
    distributionCosts: 8567,
    AdministrativeCosts: 57145,
    otherIncome: 686,
    OperatingProfit: 4917061,
    financeCosts: 75356,
    profitBeforeIncomeTax: 4841705,
    incomeTaxExpense: 1016758,
    profitForThePeriod: 3824947,
    file: "file",
  },
  "2022": {
    revenue: 15569023,
    cogs: 10586936,
    grossProfit: 4982087,
    distributionCosts: 8567,
    AdministrativeCosts: 57145,
    otherIncome: 686,
    OperatingProfit: 4917061,
    financeCosts: 75356,
    profitBeforeIncomeTax: 4841705,
    incomeTaxExpense: 1016758,
    profitForThePeriod: 3824947,
    file: "file",
  },
  "2023": {
    revenue: 15569023,
    cogs: 10586936,
    grossProfit: 4982087,
    distributionCosts: 8567,
    AdministrativeCosts: 57145,
    otherIncome: 686,
    OperatingProfit: 4917061,
    financeCosts: 75356,
    profitBeforeIncomeTax: 4841705,
    incomeTaxExpense: 1016758,
    profitForThePeriod: 3824947,
    file: "file",
  },
};

export default function Profit() {
  return (
    <FinancialsLayout showexport={true}>
      <ProfitTable TableData={TableData} />
    </FinancialsLayout>
  );
}
