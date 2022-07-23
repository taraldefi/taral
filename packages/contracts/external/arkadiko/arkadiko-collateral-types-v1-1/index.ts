import {
  BaseNodeProvider,
  BaseWebProvider,
  NodeContract,
  nodeProxy,
  WebContract,
  webProxy,
} from "lib-shared";
import { ArkadikoCollateralTypesV11Interface } from "./abi";
import type { ArkadikoCollateralTypesV11Contract } from "./types";
export type { ArkadikoCollateralTypesV11Contract } from "./types";

export const nodeArkadikoCollateralTypesV11Contract = (
  provider: BaseNodeProvider
) => {
  const contract = nodeProxy<ArkadikoCollateralTypesV11Contract>(
    ArkadikoCollateralTypesV11Interface,
    provider
  );
  return contract;
};

export const nodeArkadikoCollateralTypesV11Info: NodeContract<ArkadikoCollateralTypesV11Contract> =
  {
    contract: nodeArkadikoCollateralTypesV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/external/arkadiko/arkadiko-collateral-types-v1-1.clar",
  };

export const webArkadikoCollateralTypesV11Contract = (
  provider: BaseWebProvider
) => {
  const contract = webProxy<ArkadikoCollateralTypesV11Contract>(
    ArkadikoCollateralTypesV11Interface,
    provider
  );
  return contract;
};

export const webArkadikoCollateralTypesV11Info: WebContract<ArkadikoCollateralTypesV11Contract> =
  {
    contract: webArkadikoCollateralTypesV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/external/arkadiko/arkadiko-collateral-types-v1-1.clar",
  };
