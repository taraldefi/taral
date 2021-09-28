import { BaseProvider, Contract, proxy } from "lib-shared";
import { ArkadikoStakePoolWstxDikoV11Interface } from "./abi";
import type { ArkadikoStakePoolWstxDikoV11Contract } from "./types";
export type { ArkadikoStakePoolWstxDikoV11Contract } from "./types";

export const arkadikoStakePoolWstxDikoV11Contract = (
  provider: BaseProvider
) => {
  const contract = proxy<ArkadikoStakePoolWstxDikoV11Contract>(
    ArkadikoStakePoolWstxDikoV11Interface,
    provider
  );
  return contract;
};

export const arkadikoStakePoolWstxDikoV11Info: Contract<ArkadikoStakePoolWstxDikoV11Contract> =
  {
    contract: arkadikoStakePoolWstxDikoV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/external/arkadiko/arkadiko-stake-pool-wstx-diko-v1-1.clar",
  };
