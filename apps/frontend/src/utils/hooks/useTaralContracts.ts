import {
  useAccount,
  useAuth,
  useNetwork,
  useOpenContractCall,
} from "@micro-stacks/react";

import {
  bufferCV,
  standardPrincipalCV,
  stringUtf8CV,
  uintCV,
} from "micro-stacks/clarity";
import {
  FungibleConditionCode,
  PostConditionMode,
  createAssetInfo,
  makeStandardFungiblePostCondition,
} from "micro-stacks/transactions";

import { fetchReadOnlyFunction } from "micro-stacks/api";

import { TARAL_IMPORTER_CONTRACT } from "@utils/lib/constants";
import { utf8ToBytes } from "micro-stacks/common";

function useTaralContracts() {
  const { isSignedIn } = useAuth();
  const { stxAddress } = useAccount();
  const { openContractCall } = useOpenContractCall();
  const { network } = useNetwork();

  const SUSDT_CONTRACT =
    network.chainId === 1
      ? process.env.NEXT_PUBLIC_SUSDT_CONTRACT || ""
      : network.chainId === 2147483648
      ? process.env.NEXT_PUBLIC_SUSDT_TESTNET_CONTRACT || ""
      : "";

  const TARAL_BANK_CONTRACT =
    network.chainId === 1
      ? process.env.NEXT_PUBLIC_TARAL_BANK_CONTRACT || ""
      : network.chainId === 2147483648
      ? process.env.NEXT_PUBLIC_TARAL_BANK_TESTNET_CONTRACT || ""
      : "";

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

    const contractAddress = TARAL_IMPORTER_CONTRACT.split(".")[0];
    const contractName = TARAL_IMPORTER_CONTRACT.split(".")[1];

    if (isSignedIn) {
      await openContractCall({
        contractAddress,
        contractName,
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
    applicationId: string,
    loanAmount: number,
    downPayment: number
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const functionArgs = [
        stringUtf8CV(applicationId),
        uintCV(loanAmount),
        uintCV(downPayment),
      ];

      const contractAddress = TARAL_BANK_CONTRACT.split(".")[0];
      const contractName = TARAL_BANK_CONTRACT.split(".")[1];

      const assetAddress = SUSDT_CONTRACT.split(".")[0];
      const assetContractName = SUSDT_CONTRACT.split(".")[1];
      const fungibleAssetInfo = createAssetInfo(
        assetAddress,
        assetContractName,
        "sUSDT"
      );
      const postConditionCode = FungibleConditionCode.LessEqual;
      const postConditionAmount = downPayment;

      const contractFungiblePostCondition = makeStandardFungiblePostCondition(
        stxAddress!,
        postConditionCode,
        postConditionAmount,
        fungibleAssetInfo
      );

      if (isSignedIn) {
        await openContractCall({
          contractAddress,
          contractName,
          functionName: "create-purchase-order",
          postConditions:
            network.chainId === 1 ? [contractFungiblePostCondition] : [],
          postConditionMode:
            network.chainId === 1
              ? PostConditionMode.Deny
              : PostConditionMode.Allow,
          functionArgs: functionArgs,

          onFinish: async (data: any) => {
            console.log("finished contract call!", data);
            // wait for 3 seconds
            resolve(data);
          },
          onCancel: () => {
            console.log("popup closed!");
            //reject(new Error("user rejected transaction!"));
          },
        });
      }
    });
  }

  async function acceptFinancing(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const contractAddress = TARAL_BANK_CONTRACT.split(".")[0];
      const contractName = TARAL_BANK_CONTRACT.split(".")[1];

      if (isSignedIn) {
        await openContractCall({
          contractAddress,
          contractName,
          functionName: "accept-financing",
          postConditionMode: PostConditionMode.Allow,
          functionArgs: [],

          onFinish: async (data: any) => {
            console.log("finished contract call!", data);
            resolve(data);
          },
          onCancel: () => {
            console.log("popup closed!");
            //reject(new Error("user rejected transaction!"));
          },
        });
      }
    });
  }
  async function finance(id: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const contractAddress = TARAL_BANK_CONTRACT.split(".")[0];
      const contractName = TARAL_BANK_CONTRACT.split(".")[1];
      const functionArgs = [stringUtf8CV(id)];

      if (isSignedIn) {
        await openContractCall({
          contractAddress,
          contractName,
          functionName: "finance",
          postConditionMode: PostConditionMode.Allow,
          functionArgs,

          onFinish: async (data: any) => {
            console.log("finished contract call!", data);
            resolve(data);
          },
          onCancel: () => {
            console.log("popup closed!");
            //reject(new Error("user rejected transaction!"));
          },
        });
      }
    });
  }

  async function checkPurchaseOrderHasActiveFinancing(id: string) {
    try {
      const result: any = await fetchReadOnlyFunction({
        network: network,
        contractAddress: TARAL_BANK_CONTRACT.split(".")[0],
        contractName: TARAL_BANK_CONTRACT.split(".")[1],
        senderAddress: TARAL_BANK_CONTRACT.split(".")[0],
        functionArgs: [stringUtf8CV(id)],
        functionName: "has-active-financing",
      });
      return result;
    } catch (e: any) {
      console.error({ e });
    }
  }

  async function getPurchaseOrderById(id: string) {
    try {
      const result: any = await fetchReadOnlyFunction({
        contractAddress: TARAL_BANK_CONTRACT.split(".")[0],
        contractName: TARAL_BANK_CONTRACT.split(".")[1],
        senderAddress: TARAL_BANK_CONTRACT.split(".")[0],
        functionArgs: [stringUtf8CV(id)],
        functionName: "get-po-details",
      });
      return result;
    } catch (e: any) {
      console.error({ e });
    }
  }

  async function getActivePurchaseOrder() {
    try {
      const result: any = await fetchReadOnlyFunction({
        network: network,
        contractAddress: TARAL_BANK_CONTRACT.split(".")[0],
        contractName: TARAL_BANK_CONTRACT.split(".")[1],
        senderAddress: stxAddress!,
        functionArgs: [],
        functionName: "get-active-po-details",
      });
      console.log("result", result);
      return result;
    } catch (e: any) {
      console.error({ e });
    }
  }

  async function makePayment(amount: number): Promise<any> {
    const contractAddress = TARAL_BANK_CONTRACT.split(".")[0];
    const contractName = TARAL_BANK_CONTRACT.split(".")[1];
    const assetAddress = SUSDT_CONTRACT.split(".")[0];
    const assetContractName = SUSDT_CONTRACT.split(".")[1];
    const fungibleAssetInfo = createAssetInfo(
      assetAddress,
      assetContractName,
      "sUSDT"
    );
    const postConditionCode = FungibleConditionCode.LessEqual;
    const postConditionAmount = amount;

    const contractFungiblePostCondition = makeStandardFungiblePostCondition(
      stxAddress!,
      postConditionCode,
      postConditionAmount,
      fungibleAssetInfo
    );
    return new Promise(async (resolve, reject) => {
      if (isSignedIn) {
        await openContractCall({
          contractAddress,
          contractName,
          functionName: "make-payment",
          postConditions:
            network.chainId === 1 ? [contractFungiblePostCondition] : [],
          postConditionMode:
            network.chainId === 1
              ? PostConditionMode.Deny
              : PostConditionMode.Allow,
          functionArgs: [],

          onFinish: async (data: any) => {
            console.log("finished contract call!", data);

            resolve(data);
          },
          onCancel: () => {
            console.log("popup closed!");
          },
        });
      }
    });
  }

  return {
    // general variables
    stxAddress,
    isSignedIn,

    // core onChain helper functions
    registerTaralImporterOnChain,
    createTaralPurchaseOrder,
    getPurchaseOrderById,
    checkPurchaseOrderHasActiveFinancing,
    acceptFinancing,
    getActivePurchaseOrder,
    makePayment,
    finance,
  };
}
export default useTaralContracts;
