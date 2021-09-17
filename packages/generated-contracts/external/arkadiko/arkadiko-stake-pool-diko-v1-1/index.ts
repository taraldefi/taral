import { BaseProvider, Contract, proxy } from "taral-shared";
import { ArkadikoStakePoolDikoV11Interface } from "./abi";
import type { ArkadikoStakePoolDikoV11Contract } from "./types";
export type { ArkadikoStakePoolDikoV11Contract } from "./types";

export const arkadikoStakePoolDikoV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoStakePoolDikoV11Contract>(
    ArkadikoStakePoolDikoV11Interface,
    provider
  );
  return contract;
};

export const arkadikoStakePoolDikoV11Info: Contract<ArkadikoStakePoolDikoV11Contract> =
  {
    contract: arkadikoStakePoolDikoV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/external/arkadiko/arkadiko-stake-pool-diko-v1-1.clar",
  };
