import {
  BaseNodeProvider,
  BaseWebProvider,
  NodeContract,
  nodeProxy,
  WebContract,
  webProxy,
} from "lib-shared";
import { ArkadikoCollateralTypesTraitV1Interface } from "./abi";
import type { ArkadikoCollateralTypesTraitV1Contract } from "./types";
export type { ArkadikoCollateralTypesTraitV1Contract } from "./types";

export const nodeArkadikoCollateralTypesTraitV1Contract = (
  provider: BaseNodeProvider
) => {
  const contract = nodeProxy<ArkadikoCollateralTypesTraitV1Contract>(
    ArkadikoCollateralTypesTraitV1Interface,
    provider
  );
  return contract;
};

export const nodeArkadikoCollateralTypesTraitV1Info: NodeContract<ArkadikoCollateralTypesTraitV1Contract> =
  {
    contract: nodeArkadikoCollateralTypesTraitV1Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/external/arkadiko/arkadiko-collateral-types-trait-v1.clar",
  };

export const webArkadikoCollateralTypesTraitV1Contract = (
  provider: BaseWebProvider
) => {
  const contract = webProxy<ArkadikoCollateralTypesTraitV1Contract>(
    ArkadikoCollateralTypesTraitV1Interface,
    provider
  );
  return contract;
};

export const webArkadikoCollateralTypesTraitV1Info: WebContract<ArkadikoCollateralTypesTraitV1Contract> =
  {
    contract: webArkadikoCollateralTypesTraitV1Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/external/arkadiko/arkadiko-collateral-types-trait-v1.clar",
  };
