import ImporterBaseLayout from "@components/layouts/importer/importerBaseLayout";
import useTaralContracts from "@hooks/useTaralContracts";
import { selectedApplicationForRepaymentAtom } from "@store/applicationStore";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, LargeLoanCard, SmallLoanCard } from "@lib";

export enum LoanCardTypes {
  INTEREST_RATE = "INTEREST_RATE",
  INTEREST_ACCRUED = "INTEREST_ACCRUED",
  TOTAL_REPAYMENT = "TOTAL_REPAYMENT",
  DUE_DATE = "DUE_DATE",
  LOAN_AMT = "LOAN_AMT",
  OUTSTANDING_AMT = "OUTSTANDING_AMT",
}

function Index() {
  const router = useRouter();
  const entityID = router.query.entityId;
  const [selectedApplication] = useAtom(selectedApplicationForRepaymentAtom);
  const { getActivePurchaseOrder } = useTaralContracts();
  const [po, setPo] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await getActivePurchaseOrder();
      console.log("po", res);
      setPo(res);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching entity:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return (
      <ImporterBaseLayout>
        <div className="repaymentContainer">
          <div className="topContainer">
            <div className="titleContainer">
              <span></span>
            </div>
          </div>
        </div>
      </ImporterBaseLayout>
    );

  console.log(selectedApplication);
  return (
    <ImporterBaseLayout>
      {!(Number(po) === 134 || !po) ? (
        <>
          {" "}
          <div className="repaymentContainer">
            <div className="topContainer">
              <div className="titleContainer">
                <span>Loan Details</span>
                <span>Here's an overview of your loan details:</span>
              </div>
              <div>
                <Button
                  onClick={() => {
                    router.push(
                      `/users/${
                        router.asPath.split("/")[2]
                      }/entities/${entityID}/repayment/receipts`
                    );
                  }}
                  label={"VIEW RECEIPTS"}
                ></Button>
              </div>
            </div>

            <div className="gridContainer">
              <div>
                <LargeLoanCard
                  type={LoanCardTypes.LOAN_AMT}
                  value={(
                    Number(po["total-amount"]) / Math.pow(10, 6)
                  ).toString()}
                />
              </div>
              <div>
                <LargeLoanCard
                  type={LoanCardTypes.OUTSTANDING_AMT}
                  value={(
                    Number(po["outstanding-amount"]) / Math.pow(10, 6)
                  ).toString()}
                />
              </div>
              <div className="repaymentButtonContainer">
                <span>Ready to pay?</span>
                <Button
                  onClick={() => {
                    router.push(
                      `/users/${
                        router.asPath.split("/")[2]
                      }/entities/${entityID}/repayment/pay?amount=${(
                        Number(po["interest"]) / Math.pow(10, 6) +
                        Number(po["outstanding-amount"]) / Math.pow(10, 6)
                      ).toString()}`
                    );
                  }}
                  primary={true}
                  backgroundColor="#1AB98B"
                  label={"GO TO LOAN PAYMENT"}
                />
              </div>
              <div>
                <SmallLoanCard
                  value={(Number(po["interest"]) / Math.pow(10, 6)).toString()}
                  type={LoanCardTypes.INTEREST_ACCRUED}
                />
              </div>

              <div>
                <SmallLoanCard value="12%" type={LoanCardTypes.INTEREST_RATE} />
              </div>

              <div>
                <SmallLoanCard
                  value={(
                    Number(po["interest"]) / Math.pow(10, 6) +
                    Number(po["outstanding-amount"]) / Math.pow(10, 6)
                  ).toString()}
                  type={LoanCardTypes.TOTAL_REPAYMENT}
                />
              </div>
              {/* <div>
            <SmallLoanCard value="May 20th" type={LoanCardTypes.DUE_DATE} />
          </div> */}
              <div className="repaymentLogoutContainer">
                <span>
                  Remember to log out to keep your account information secure.
                </span>
                <Button label={"LOGOUT"}></Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="repaymentContainer">
          <div
            style={{
              gap: "10px",
              marginTop: "30vh",
              display: "flex",
              flexDirection: "column",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <h2>No active purchase order</h2>
          </div>
        </div>
      )}
    </ImporterBaseLayout>
  );
}

export default Index;
