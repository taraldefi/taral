import { BaseProvider } from "../../../../lib/providers/base-provider";
import { proxy } from "../../../../lib/test-utils/proxy";
import { Contract } from "../../../../lib/types";
import { ArkadikoSwapTokenWstxDikoInterface } from "./abi";
import type { ArkadikoSwapTokenWstxDikoContract } from "./types";

export type { ArkadikoSwapTokenWstxDikoContract } from "./types";

export const arkadikoSwapTokenWstxDikoContract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoSwapTokenWstxDikoContract>(
    ArkadikoSwapTokenWstxDikoInterface,
    provider
  );
  return contract;
};

export const arkadikoSwapTokenWstxDikoInfo: Contract<ArkadikoSwapTokenWstxDikoContract> =
  {
    contract: arkadikoSwapTokenWstxDikoContract,
    address: "ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR",
    contractFile:
      "clarity/contracts/external/arkadiko/arkadiko-swap-token-wstx-diko.clar",
  };
