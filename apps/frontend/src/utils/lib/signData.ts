import { StacksNetwork } from "micro-stacks/network";
import { useOpenSignMessage } from "@micro-stacks/react";

export function signData(
  message: string,
  network: StacksNetwork
): Promise<any> {
  const { openSignMessage, isRequestPending } = useOpenSignMessage();
  return new Promise((resolve, reject) => {
    openSignMessage({
      message,
      onFinish: (walletResponse) => {
        console.log("walletResponse", walletResponse);
      },
    });
  });
}
