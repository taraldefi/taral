import { useAccount, useAuth, useOpenContractCall } from "@micro-stacks/react";
import {
  bufferCV,
  standardPrincipalCV,
  stringUtf8CV,
  uintCV,
} from "micro-stacks/clarity";

import { utf8ToBytes } from "micro-stacks/common";

function useTaralContracts() {
  const { isSignedIn } = useAuth();
  const { stxAddress } = useAccount();

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

          functionArgs: functionArgs,

          onFinish: async (data: any) => {
            console.log("finished contract call!", data);
            resolve(data);
          },
          onCancel: () => {
            console.log("popup closed!");
            reject(new Error("popup closed!"));
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
