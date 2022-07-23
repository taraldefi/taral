import {
  BaseNodeProvider,
  BaseWebProvider,
  NodeContract,
  nodeProxy,
  WebContract,
  webProxy,
} from "lib-shared";
import { ArkadikoSwapV11Interface } from "./abi";
import type { ArkadikoSwapV11Contract } from "./types";
export type { ArkadikoSwapV11Contract } from "./types";

export const nodeArkadikoSwapV11Contract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<ArkadikoSwapV11Contract>(
    ArkadikoSwapV11Interface,
    provider
  );
  return contract;
};

export const nodeArkadikoSwapV11Info: NodeContract<ArkadikoSwapV11Contract> = {
  contract: nodeArkadikoSwapV11Contract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile:
    "packages/clarity/contracts/external/arkadiko/arkadiko-swap-v1-1.clar",
};

export const webArkadikoSwapV11Contract = (provider: BaseWebProvider) => {
  const contract = webProxy<ArkadikoSwapV11Contract>(
    ArkadikoSwapV11Interface,
    provider
  );
  return contract;
};

export const webArkadikoSwapV11Info: WebContract<ArkadikoSwapV11Contract> = {
  contract: webArkadikoSwapV11Contract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile:
    "packages/clarity/contracts/external/arkadiko/arkadiko-swap-v1-1.clar",
};
