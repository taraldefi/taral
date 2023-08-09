import FinancialsLayout from "@components/layouts/financials_layout";
import { CashTable } from "@components/widgets/table/cashTable";

const TableData = {
  "2017": {
    cashFlowFromOperatingIncome: 14234678,
    activityTitle: 9252541,
    cashFlowFromFinancialIncome: 4982137,
    activityTitle1: 4567,
    cashFlowFromInvestingIncome: 4932412,
    activityTitle2: 51468,
    file: "file",
  },
  "2018": {
    cashFlowFromOperatingIncome: 14234678,
    activityTitle: 9252541,
    cashFlowFromFinancialIncome: 4982137,
    activityTitle1: 4567,
    cashFlowFromInvestingIncome: 4932412,
    activityTitle2: 51468,
    file: "file",
  },
  "2019": {
    cashFlowFromOperatingIncome: 14234678,
    activityTitle: 9252541,
    cashFlowFromFinancialIncome: 4982137,
    activityTitle1: 4567,
    cashFlowFromInvestingIncome: 4932412,
    activityTitle2: 51468,
    file: "file",
  },
  "2020": {
    cashFlowFromOperatingIncome: 14234678,
    activityTitle: 9252541,
    cashFlowFromFinancialIncome: 4982137,
    activityTitle1: 4567,
    cashFlowFromInvestingIncome: 4932412,
    activityTitle2: 51468,
    file: "file",
  },
};
export default function Cash() {
  return (
    <FinancialsLayout showexport={true}>
      <CashTable TableData={TableData} />
    </FinancialsLayout>
  );
}
