import {
  BaseNodeProvider,
  BaseWebProvider,
  NodeContract,
  nodeProxy,
  WebContract,
  webProxy,
} from "lib-shared";
import { ArkadikoStakePoolWstxDikoV11Interface } from "./abi";
import type { ArkadikoStakePoolWstxDikoV11Contract } from "./types";
export type { ArkadikoStakePoolWstxDikoV11Contract } from "./types";

export const nodeArkadikoStakePoolWstxDikoV11Contract = (
  provider: BaseNodeProvider
) => {
  const contract = nodeProxy<ArkadikoStakePoolWstxDikoV11Contract>(
    ArkadikoStakePoolWstxDikoV11Interface,
    provider
  );
  return contract;
};

export const nodeArkadikoStakePoolWstxDikoV11Info: NodeContract<ArkadikoStakePoolWstxDikoV11Contract> =
  {
    contract: nodeArkadikoStakePoolWstxDikoV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/external/arkadiko/arkadiko-stake-pool-wstx-diko-v1-1.clar",
  };

export const webArkadikoStakePoolWstxDikoV11Contract = (
  provider: BaseWebProvider
) => {
  const contract = webProxy<ArkadikoStakePoolWstxDikoV11Contract>(
    ArkadikoStakePoolWstxDikoV11Interface,
    provider
  );
  return contract;
};

export const webArkadikoStakePoolWstxDikoV11Info: WebContract<ArkadikoStakePoolWstxDikoV11Contract> =
  {
    contract: webArkadikoStakePoolWstxDikoV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/external/arkadiko/arkadiko-stake-pool-wstx-diko-v1-1.clar",
  };
