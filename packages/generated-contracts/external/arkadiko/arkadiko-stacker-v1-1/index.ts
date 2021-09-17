import { BaseProvider, Contract, proxy } from "taral-shared";
import { ArkadikoStackerV11Interface } from "./abi";
import type { ArkadikoStackerV11Contract } from "./types";
export type { ArkadikoStackerV11Contract } from "./types";

export const arkadikoStackerV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoStackerV11Contract>(
    ArkadikoStackerV11Interface,
    provider
  );
  return contract;
};

export const arkadikoStackerV11Info: Contract<ArkadikoStackerV11Contract> = {
  contract: arkadikoStackerV11Contract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile:
    "packages/clarity/contracts/external/arkadiko/arkadiko-stacker-v1-1.clar",
};
