import {
  useAccount,
  useAuth,
  useOpenContractCall,
  useOpenSignMessage,
} from "@micro-stacks/react";
import { useNavigate } from "react-router-dom";
import {
  bufferCV,
  standardPrincipalCV,
  stringUtf8CV,
} from "micro-stacks/clarity";

import { utf8ToBytes } from "micro-stacks/common";

function useTaralContracts() {
  const navigate = useNavigate();

  const { isSignedIn } = useAuth();
  const { openSignMessage } = useOpenSignMessage();
  const { stxAddress } = useAccount();

  const contractAddress = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";
  const { openContractCall } = useOpenContractCall();
  enum TaralContracts {
    TARAL_IMPORTER = "taral-importer",
    TARAL_BANK = "taral-bank",
  }

  async function registerImporterOnChain(
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

  return {
    stxAddress,
    isSignedIn,
    TaralContracts,

    // core onChain functions
    registerImporterOnChain,
  };
}
export default useTaralContracts;
