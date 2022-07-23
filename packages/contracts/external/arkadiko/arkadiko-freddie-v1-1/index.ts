import {
  BaseNodeProvider,
  BaseWebProvider,
  NodeContract,
  nodeProxy,
  WebContract,
  webProxy,
} from "lib-shared";
import { ArkadikoFreddieV11Interface } from "./abi";
import type { ArkadikoFreddieV11Contract } from "./types";
export type { ArkadikoFreddieV11Contract } from "./types";

export const nodeArkadikoFreddieV11Contract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<ArkadikoFreddieV11Contract>(
    ArkadikoFreddieV11Interface,
    provider
  );
  return contract;
};

export const nodeArkadikoFreddieV11Info: NodeContract<ArkadikoFreddieV11Contract> =
  {
    contract: nodeArkadikoFreddieV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/external/arkadiko/arkadiko-freddie-v1-1.clar",
  };

export const webArkadikoFreddieV11Contract = (provider: BaseWebProvider) => {
  const contract = webProxy<ArkadikoFreddieV11Contract>(
    ArkadikoFreddieV11Interface,
    provider
  );
  return contract;
};

export const webArkadikoFreddieV11Info: WebContract<ArkadikoFreddieV11Contract> =
  {
    contract: webArkadikoFreddieV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/external/arkadiko/arkadiko-freddie-v1-1.clar",
  };
