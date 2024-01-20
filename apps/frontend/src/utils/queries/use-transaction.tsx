// Hook (use-tranaction.tsx)
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useNetwork } from "@micro-stacks/react";
import { fetchTransaction } from "micro-stacks/api";
import { toast } from "sonner";

export function useTransaction(transactionId: string) {
  console.log("transactionId", transactionId);
  const [interval, setInterval] = useState(3000);
  const { network } = useNetwork();
  const { isFetching, isLoading, isError, data } = useQuery({
    queryKey: ["transaction", transactionId],
    queryFn: async () => {
      console.log("fetching...", transactionId);
      const data = await fetchTransaction({
        url: network.getCoreApiUrl(),
        txid: transactionId,
        event_offset: 0,
        event_limit: 1,
      });
      if (data!.tx_status === "success") {
        console.log("success");
        toast.success("Transaction Successfully minted!");
        setInterval(0);
      }
      console.log("data", data);
      return data;
    },
    enabled: transactionId !== "",
    refetchInterval: interval,
  });

  return { isFetching, isLoading, isError, data };
}
