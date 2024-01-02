import { useAccount, useAuth, useOpenContractCall } from "@micro-stacks/react";
import {
  bufferCV,
  standardPrincipalCV,
  stringUtf8CV,
  uintCV,
} from "micro-stacks/clarity";

import axios from "axios";
import { utf8ToBytes } from "micro-stacks/common";

function useTaralContracts() {
  const { isSignedIn } = useAuth();
  const { stxAddress } = useAccount();

  async function checkTransactionStatus(
    txId: string,
    maxAttempts: number = 30,
    delay: number = 3000
  ): Promise<any> {
    let attempts = 0;

    while (attempts < maxAttempts) {
      try {
        const response = await axios.get(
          `http://localhost:3999/extended/v1/tx/${txId}`
        );
        if (response.data.tx_status === "success") {
          console.log(response.data);
          return "Transaction successfully submitted on chain";
        } else if (response.data.tx_status === "pending") {
          attempts++;
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else if (response.data.tx_status === "failed") {
          throw new Error(`Transaction failed`);
        } else {
          throw new Error(
            `Transaction failed with status: ${response.data.tx_status}`
          );
        }
      } catch (error) {
        console.log(error);
        throw new Error("API error");
      }
    }

    return "Maximum attempts reached, transaction still pending but you can submit the application";
  }

  const contractAddress = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";
  const { openContractCall } = useOpenContractCall();
  enum TaralContracts {
    TARAL_IMPORTER = "taral-importer",
    TARAL_BANK = "taral-bank-complete",
  }

  async function registerTaralImporterOnChain(
    importerPrincipal: string,
    importerName: string,
    hash: string,
    importerCategory: string
  ) {
    const functionArgs = [
      standardPrincipalCV(importerPrincipal),
      stringUtf8CV(importerName),
      bufferCV(utf8ToBytes(hash)),
      stringUtf8CV(importerCategory),
    ];

    if (isSignedIn) {
      await openContractCall({
        contractAddress: contractAddress,
        contractName: TaralContracts.TARAL_IMPORTER,
        functionName: "register",

        functionArgs: functionArgs,

        onFinish: async (data: any) => {
          console.log("finished contract call!", data);
        },
        onCancel: () => {
          console.log("popup closed!");
        },
      });
    }
  }

  async function createTaralPurchaseOrder(
    totalAmount: number,
    downPayment: number,
    sellerPrincipal: string
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const functionArgs = [
        uintCV(totalAmount),
        uintCV(downPayment),
        standardPrincipalCV(sellerPrincipal),
      ];

      if (isSignedIn) {
        await openContractCall({
          contractAddress: contractAddress,
          contractName: TaralContracts.TARAL_BANK,
          functionName: "create-purchase-order",
          postConditionMode: 1,
          functionArgs: functionArgs,

          onFinish: async (data: any) => {
            console.log("finished contract call!", data);
            // wait for 3 seconds
            await new Promise((resolve) => setTimeout(resolve, 3000));
            const txResponse = await checkTransactionStatus(data.txId);
            // update application with PO ID
            resolve(txResponse);
          },
          onCancel: () => {
            console.log("popup closed!");
            reject(new Error("user rejected transaction!"));
          },
        });
      }
    });
  }

  async function getTaralPurchaseOrderById(purchaseOrderId: number) {
    const functionArgs = [uintCV(purchaseOrderId)];

    if (isSignedIn) {
      await openContractCall({
        contractAddress: contractAddress,
        contractName: TaralContracts.TARAL_BANK,
        functionName: "get-purchase-order-by-id",

        functionArgs: functionArgs,

        onFinish: async (data: any) => {
          console.log("finished contract call!", data);
        },
        onCancel: () => {
          console.log("popup closed!");
        },
      });
    }
  }

  async function checkPurchaseOrderHasActiveFinancing(purchaseOrderId: number) {
    const functionArgs = [uintCV(purchaseOrderId)];

    if (isSignedIn) {
      await openContractCall({
        contractAddress: contractAddress,
        contractName: TaralContracts.TARAL_BANK,
        functionName: "has-active-financing",

        functionArgs: functionArgs,

        onFinish: async (data: any) => {
          console.log("finished contract call!", data);
        },
        onCancel: () => {
          console.log("popup closed!");
        },
      });
    }
  }

  async function makePayment(purchaseOrderId: number, amount: number) {
    const functionArgs = [uintCV(purchaseOrderId), uintCV(amount)];

    if (isSignedIn) {
      await openContractCall({
        contractAddress: contractAddress,
        contractName: TaralContracts.TARAL_BANK,
        functionName: "make-payment",

        functionArgs: functionArgs,

        onFinish: async (data: any) => {
          console.log("finished contract call!", data);
        },
        onCancel: () => {
          console.log("popup closed!");
        },
      });
    }
  }

  return {
    // general variables
    stxAddress,
    isSignedIn,
    TaralContracts,

    // core onChain helper functions
    registerTaralImporterOnChain,
    createTaralPurchaseOrder,
    getTaralPurchaseOrderById,
    checkPurchaseOrderHasActiveFinancing,
    makePayment,
  };
}
export default useTaralContracts;
