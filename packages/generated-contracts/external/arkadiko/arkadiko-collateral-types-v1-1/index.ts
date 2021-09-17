import { BaseProvider, Contract, proxy } from "taral-shared";
import { ArkadikoCollateralTypesV11Interface } from "./abi";
import type { ArkadikoCollateralTypesV11Contract } from "./types";
export type { ArkadikoCollateralTypesV11Contract } from "./types";

export const arkadikoCollateralTypesV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoCollateralTypesV11Contract>(
    ArkadikoCollateralTypesV11Interface,
    provider
  );
  return contract;
};

export const arkadikoCollateralTypesV11Info: Contract<ArkadikoCollateralTypesV11Contract> =
  {
    contract: arkadikoCollateralTypesV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/external/arkadiko/arkadiko-collateral-types-v1-1.clar",
  };
