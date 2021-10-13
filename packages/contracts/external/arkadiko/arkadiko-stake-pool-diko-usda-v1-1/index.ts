import {
  BaseNodeProvider,
  BaseWebProvider,
  NodeContract,
  nodeProxy,
  WebContract,
  webProxy,
} from "lib-shared";
import { ArkadikoStakePoolDikoUsdaV11Interface } from "./abi";
import type { ArkadikoStakePoolDikoUsdaV11Contract } from "./types";
export type { ArkadikoStakePoolDikoUsdaV11Contract } from "./types";

export const nodeArkadikoStakePoolDikoUsdaV11Contract = (
  provider: BaseNodeProvider
) => {
  const contract = nodeProxy<ArkadikoStakePoolDikoUsdaV11Contract>(
    ArkadikoStakePoolDikoUsdaV11Interface,
    provider
  );
  return contract;
};

export const nodeArkadikoStakePoolDikoUsdaV11Info: NodeContract<ArkadikoStakePoolDikoUsdaV11Contract> =
  {
    contract: nodeArkadikoStakePoolDikoUsdaV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/external/arkadiko/arkadiko-stake-pool-diko-usda-v1-1.clar",
  };

export const webArkadikoStakePoolDikoUsdaV11Contract = (
  provider: BaseWebProvider
) => {
  const contract = webProxy<ArkadikoStakePoolDikoUsdaV11Contract>(
    ArkadikoStakePoolDikoUsdaV11Interface,
    provider
  );
  return contract;
};

export const webArkadikoStakePoolDikoUsdaV11Info: WebContract<ArkadikoStakePoolDikoUsdaV11Contract> =
  {
    contract: webArkadikoStakePoolDikoUsdaV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/external/arkadiko/arkadiko-stake-pool-diko-usda-v1-1.clar",
  };
