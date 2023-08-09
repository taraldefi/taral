interface financialInfoProfitLoss {
  [key: string];
  revenue: number;
  cogs: number;
  grossProfit: number;
  distributionCosts: number;
  AdministrativeCosts: number;
  otherIncome: number;
  OperatingProfit: number;
  financeCosts: number;
  profitBeforeIncomeTax: number;
  incomeTaxExpense: number;
  profitForThePeriod: number;
  file: string; //file hash for the pdf file
}
export interface profitLossTableType {
  [key: string]: financialInfoProfitLoss;
}
interface financialInfoBalanceSheet {
  [key: string];
  currentAssets: number;
  cash: number;
  nonCurrentAssets: number;
  propertyPlantEquipment: number;
  currentLiabilities: number;
  accountsPayables: number;
  nonCurrentLiabilities: number;
  bankLoans: number;
  totalLiabilities: number;
  equity: number;
  paidInCapital: number;
  totalLiabilitiesEquity: number;
  file: string; //file hash for the pdf file
}
export interface balanceSheetTableType {
  [key: string]: financialInfoBalanceSheet;
}
interface financialInfoCashFLow {
  [key: string];
  cashFlowFromOperatingIncome: number;
  activityTitle: number;
  cashFlowFromFinancialIncome: number;
  activityTitle: number;
  cashFlowFromInvestingIncome: number;
  activityTitle: number;
  file: string; //file hash for the pdf file
}
export interface cashFlowTableType {
  [key: string]: financialInfoCashFLow;
}
