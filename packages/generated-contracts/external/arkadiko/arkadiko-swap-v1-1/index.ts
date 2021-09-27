import { BaseProvider, Contract, proxy } from "lib-shared";
import { ArkadikoSwapV11Interface } from "./abi";
import type { ArkadikoSwapV11Contract } from "./types";
export type { ArkadikoSwapV11Contract } from "./types";

export const arkadikoSwapV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoSwapV11Contract>(
    ArkadikoSwapV11Interface,
    provider
  );
  return contract;
};

export const arkadikoSwapV11Info: Contract<ArkadikoSwapV11Contract> = {
  contract: arkadikoSwapV11Contract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile:
    "packages/clarity/contracts/external/arkadiko/arkadiko-swap-v1-1.clar",
};
