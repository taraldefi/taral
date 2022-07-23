import {
  BaseNodeProvider,
  BaseWebProvider,
  NodeContract,
  nodeProxy,
  WebContract,
  webProxy,
} from "lib-shared";
import { ArkadikoStakePoolDikoTraitV1Interface } from "./abi";
import type { ArkadikoStakePoolDikoTraitV1Contract } from "./types";
export type { ArkadikoStakePoolDikoTraitV1Contract } from "./types";

export const nodeArkadikoStakePoolDikoTraitV1Contract = (
  provider: BaseNodeProvider
) => {
  const contract = nodeProxy<ArkadikoStakePoolDikoTraitV1Contract>(
    ArkadikoStakePoolDikoTraitV1Interface,
    provider
  );
  return contract;
};

export const nodeArkadikoStakePoolDikoTraitV1Info: NodeContract<ArkadikoStakePoolDikoTraitV1Contract> =
  {
    contract: nodeArkadikoStakePoolDikoTraitV1Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/external/arkadiko/arkadiko-stake-pool-diko-trait-v1.clar",
  };

export const webArkadikoStakePoolDikoTraitV1Contract = (
  provider: BaseWebProvider
) => {
  const contract = webProxy<ArkadikoStakePoolDikoTraitV1Contract>(
    ArkadikoStakePoolDikoTraitV1Interface,
    provider
  );
  return contract;
};

export const webArkadikoStakePoolDikoTraitV1Info: WebContract<ArkadikoStakePoolDikoTraitV1Contract> =
  {
    contract: webArkadikoStakePoolDikoTraitV1Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/external/arkadiko/arkadiko-stake-pool-diko-trait-v1.clar",
  };
