import {
  BaseNodeProvider,
  BaseWebProvider,
  NodeContract,
  nodeProxy,
  WebContract,
  webProxy,
} from "lib-shared";
import { ArkadikoSwapTraitV1Interface } from "./abi";
import type { ArkadikoSwapTraitV1Contract } from "./types";
export type { ArkadikoSwapTraitV1Contract } from "./types";

export const nodeArkadikoSwapTraitV1Contract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<ArkadikoSwapTraitV1Contract>(
    ArkadikoSwapTraitV1Interface,
    provider
  );
  return contract;
};

export const nodeArkadikoSwapTraitV1Info: NodeContract<ArkadikoSwapTraitV1Contract> =
  {
    contract: nodeArkadikoSwapTraitV1Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/external/arkadiko/arkadiko-swap-trait-v1.clar",
  };

export const webArkadikoSwapTraitV1Contract = (provider: BaseWebProvider) => {
  const contract = webProxy<ArkadikoSwapTraitV1Contract>(
    ArkadikoSwapTraitV1Interface,
    provider
  );
  return contract;
};

export const webArkadikoSwapTraitV1Info: WebContract<ArkadikoSwapTraitV1Contract> =
  {
    contract: webArkadikoSwapTraitV1Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/external/arkadiko/arkadiko-swap-trait-v1.clar",
  };
