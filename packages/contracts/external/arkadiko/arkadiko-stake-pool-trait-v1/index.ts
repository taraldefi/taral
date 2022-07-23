import {
  BaseNodeProvider,
  BaseWebProvider,
  NodeContract,
  nodeProxy,
  WebContract,
  webProxy,
} from "lib-shared";
import { ArkadikoStakePoolTraitV1Interface } from "./abi";
import type { ArkadikoStakePoolTraitV1Contract } from "./types";
export type { ArkadikoStakePoolTraitV1Contract } from "./types";

export const nodeArkadikoStakePoolTraitV1Contract = (
  provider: BaseNodeProvider
) => {
  const contract = nodeProxy<ArkadikoStakePoolTraitV1Contract>(
    ArkadikoStakePoolTraitV1Interface,
    provider
  );
  return contract;
};

export const nodeArkadikoStakePoolTraitV1Info: NodeContract<ArkadikoStakePoolTraitV1Contract> =
  {
    contract: nodeArkadikoStakePoolTraitV1Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/external/arkadiko/arkadiko-stake-pool-trait-v1.clar",
  };

export const webArkadikoStakePoolTraitV1Contract = (
  provider: BaseWebProvider
) => {
  const contract = webProxy<ArkadikoStakePoolTraitV1Contract>(
    ArkadikoStakePoolTraitV1Interface,
    provider
  );
  return contract;
};

export const webArkadikoStakePoolTraitV1Info: WebContract<ArkadikoStakePoolTraitV1Contract> =
  {
    contract: webArkadikoStakePoolTraitV1Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/external/arkadiko/arkadiko-stake-pool-trait-v1.clar",
  };
