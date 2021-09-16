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
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "clarity/contracts/external/arkadiko/arkadiko-swap-token-wstx-diko.clar",
  };
