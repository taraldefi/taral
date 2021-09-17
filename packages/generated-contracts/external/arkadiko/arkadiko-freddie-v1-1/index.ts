import { BaseProvider, Contract, proxy } from "taral-shared";
import { ArkadikoFreddieV11Interface } from "./abi";
import type { ArkadikoFreddieV11Contract } from "./types";
export type { ArkadikoFreddieV11Contract } from "./types";

export const arkadikoFreddieV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoFreddieV11Contract>(
    ArkadikoFreddieV11Interface,
    provider
  );
  return contract;
};

export const arkadikoFreddieV11Info: Contract<ArkadikoFreddieV11Contract> = {
  contract: arkadikoFreddieV11Contract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile:
    "C:\biz\taral/packages/clarity/contracts/external/arkadiko/arkadiko-freddie-v1-1.clar",
};
