import { BaseProvider, Contract, proxy } from "taral-shared";
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
      "C:\biz\taral/packages/clarity/contracts/external/arkadiko/arkadiko-swap-token-wstx-diko.clar",
  };
