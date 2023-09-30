import { StacksNetwork } from "@stacks/network";
import { openSignatureRequestPopup } from "@stacks/connect";

export function signData(
  message: string,
  network: StacksNetwork
): Promise<any> {
  return new Promise((resolve, reject) => {
    openSignatureRequestPopup({
      message,
      network: network, // for mainnet, `new StacksMainnet()`
      appDetails: {
        name: "Tariala",
        icon: window.location.origin + "/my-app-logo.svg",
      },
      onFinish(data) {
        if (data) {
          resolve(data); // Resolve the promise with the data
        } else {
          reject("No data"); // Reject the promise if there's no data
        }
      },
      onCancel() {
        reject("Signature request cancelled"); // Reject the promise on cancel
      },
    });
  });
}
