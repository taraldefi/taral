import ImporterBaseLayout from "@components/layouts/importer/importerBaseLayout";
import RepaymentCard from "@components/widgets/RepaymentCard";
import { useSearchParams } from "next/navigation";

export enum LoanCardTypes {
  INTEREST_RATE = "INTEREST_RATE",
  INTEREST_ACCRUED = "INTEREST_ACCRUED",
  TOTAL_REPAYMENT = "TOTAL_REPAYMENT",
  DUE_DATE = "DUE_DATE",
  LOAN_AMT = "LOAN_AMT",
  OUTSTANDING_AMT = "OUTSTANDING_AMT",
}

function Index() {
  const amount = useSearchParams().get("amount");

  return (
    <ImporterBaseLayout>
      <div className="viewbody">
        <div className="repaymentContainer">
          <div className="topContainer">
            <div className="titleContainer">
              <span>Loan Repayment</span>
              <span>
                Repay your trade finance loan with our USD-pegged stablecoin.
              </span>
            </div>
          </div>

          <div className="repaymentTableAndCardContainer">
            {/* <div className="tableContainer">
              <RepaymentTable
                repaymentTableData={RepaymentTableData}
              ></RepaymentTable>
            </div> */}
            <div className="cardContainer">
              <RepaymentCard amount={amount!}></RepaymentCard>
            </div>
          </div>
        </div>
      </div>
    </ImporterBaseLayout>
  );
}

export default Index;
