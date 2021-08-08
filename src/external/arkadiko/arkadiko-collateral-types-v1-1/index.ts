import { BaseProvider } from "../../../../shared/providers/base-provider";
import { proxy } from "../../../../shared/test-utils/proxy";
import { Contract } from "../../../../shared/types";
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
    address: "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH",
    contractFile:
      "contracts/external/arkadiko/arkadiko-collateral-types-v1-1.clar",
  };
