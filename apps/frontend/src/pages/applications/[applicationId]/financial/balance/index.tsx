import FinancialsLayout from "@components/layouts/auditor/financials_layout";
import { BalanceTable } from "@components/widgets/table/balanceTable";

const TableData = {
  2020: {
    currentAssets: 14234678,
    cash: 9252541,
    nonCurrentAssets: 0,
    propertyPlantEquipment: 0,
    currentLiabilities: 4982137,
    accountsPayables: 4567,
    nonCurrentLiabilities: 4932412,
    bankLoans: 51468,
    totalLiabilities: 4880944,
    equity: 976189,
    paidInCapital: 976189,
    totalLiabilitiesEquity: 3904755,
    file: "file",
  },
  2021: {
    currentAssets: 14234678,
    cash: 9252541,
    nonCurrentAssets: 0,
    propertyPlantEquipment: 0,
    currentLiabilities: 4982137,
    accountsPayables: 4567,
    nonCurrentLiabilities: 4932412,
    bankLoans: 51468,
    totalLiabilities: 4880944,
    equity: 976189,
    paidInCapital: 976189,
    totalLiabilitiesEquity: 3904755,
    file: "file",
  },
  2022: {
    currentAssets: 14234678,
    cash: 9252541,
    nonCurrentAssets: 0,
    propertyPlantEquipment: 0,
    currentLiabilities: 4982137,
    accountsPayables: 4567,
    nonCurrentLiabilities: 4932412,
    bankLoans: 51468,
    totalLiabilities: 4880944,
    equity: 976189,
    paidInCapital: 976189,
    totalLiabilitiesEquity: 3904755,
    file: "file",
  },
  2023: {
    currentAssets: 14234678,
    cash: 9252541,
    nonCurrentAssets: 0,
    propertyPlantEquipment: 0,
    currentLiabilities: 4982137,
    accountsPayables: 4567,
    nonCurrentLiabilities: 4932412,
    bankLoans: 51468,
    totalLiabilities: 4880944,
    equity: 976189,
    paidInCapital: 976189,
    totalLiabilitiesEquity: 3904755,
    file: "file",
  },
};

export default function Balance() {
  return (
    <FinancialsLayout showexport={true}>
      <BalanceTable TableData={TableData} />
    </FinancialsLayout>
  );
}
