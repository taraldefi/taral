import useTaralContracts from "@hooks/useTaralContracts";
import { getExplorerLink } from "@utils/helper";
import { useTransaction } from "@utils/queries/use-transaction";
import React from "react";
import { toast } from "sonner";
import { Button } from "taral-ui";

const FinanceButton = ({ applicationId }: any) => {
  const { finance } = useTaralContracts();
  const [transactionId, setTransactionId] = React.useState("");
  const { data: transaction, isError } = useTransaction(transactionId);

  const handleFinance = async () => {
    const transactionData = await finance(applicationId);
    setTransactionId(transactionData.txId);
    toast("Transaction Submitted", {
      action: {
        label: "view transaction",
        onClick: () => window.open(getExplorerLink(transactionData.txId)),
      },
    });
  };

  if (transaction?.tx_status === "success") {
    toast.success("Transaction Successfully minted!");
  }
  return (
    <Button
      primary
      backgroundColor="#1ab98b"
      disabled={transaction?.tx_status === "pending"}
      label={"finance"}
      onClick={() => {
        handleFinance();
      }}
    ></Button>
  );
};

export default FinanceButton;
