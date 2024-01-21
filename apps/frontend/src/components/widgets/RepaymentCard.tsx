import { Button } from "taral-ui";
import React, { useState } from "react";
import { DollarSign, LogOut } from "react-feather";
import useTaralContracts from "@hooks/useTaralContracts";
import { getExplorerLink } from "@utils/helper";
import { useTransaction } from "@utils/queries/use-transaction";

import { toast } from "sonner";
import { useRouter } from "next/router";

interface repaymentCardProp {
  amount?: string;
}

const RepaymentCard = ({ amount = "0" }: repaymentCardProp) => {
  const [selectedId, setSelectedId] = React.useState<number>(0);
  function handleSelect(index: number) {
    setSelectedId(index);
  }
  const router = useRouter();
  const entityID = router.query.entityId;
  const { makePayment } = useTaralContracts();
  const [transactionId, setTransactionId] = useState<string>("");
  const { data: transaction, isError } = useTransaction(transactionId);

  const handlePayment = async () => {
    const transaction = await makePayment();
    setTransactionId(transaction.txId);
    console.log("transaction", transaction);
    toast("Transaction Submitted.", {
      description:
        " If the transaction takes more than 20 minutes to settle refresh and continue to second step",
      action: {
        label: "view transaction",
        onClick: () => window.open(getExplorerLink(transaction.txId)),
      },
    });
  };

  if (transaction?.tx_status === "success") {
    toast.success("Transaction Successfully minted!");
    router.push(
      `/users/${
        router.asPath.split("/")[2]
      }/entities/${entityID}/repayment/successful`
    );
  }
  return (
    <div className="repaymentCard">
      <div>
        <h3>Choose Repayment Method</h3>
        <span>Select your preferred repayment method:</span>
      </div>
      <div className="switchTabContainer">
        <div
          onClick={() => {
            handleSelect(0);
          }}
          className={`${selectedId === 0 ? "switchTab selected" : "switchTab"}`}
        >
          <div style={{ display: "flex" }}>
            <DollarSign
              color={`${selectedId === 0 ? "#1B52EB" : "#65768D"}`}
            ></DollarSign>
          </div>
          <span className={`${selectedId === 0 ? "bold" : "text"}`}>
            USD-Stablecoin
          </span>
        </div>
        <div
          onClick={() => {
            handleSelect(1);
          }}
          className={`${selectedId === 1 ? "switchTab selected" : "switchTab"}`}
        >
          <div style={{ display: "flex" }}>
            <LogOut
              color={`${selectedId === 1 ? "#1B52EB" : "#65768D"}`}
            ></LogOut>
          </div>
          <span className={`${selectedId === 1 ? "bold" : "text"}`}>
            Direct Transfer
          </span>
        </div>
      </div>
      <div className="inputContainer">
        <input
          disabled
          type="text"
          className="inputs"
          id="dollar"
          placeholder={amount}
        />
      </div>

      <div>
        <Button
          onClick={() => {
            handlePayment();
          }}
          disabled={transaction?.tx_status === "pending"}
          label={
            transaction?.tx_status === "pending"
              ? "waiting for confirmation..."
              : "AUTHORIZE REPAYMENT"
          }
          primary={true}
          backgroundColor="#1AB98B"
        ></Button>
      </div>
      <div></div>
    </div>
  );
};

export default RepaymentCard;
