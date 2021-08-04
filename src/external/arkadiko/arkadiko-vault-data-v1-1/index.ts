import { Contract } from "../../../../shared/types";
import { proxy } from "../../../../shared/test-utils/proxy";
import { BaseProvider } from "../../../../shared/providers/base-provider";

import type { ArkadikoVaultDataV11Contract } from "./types";
import { ArkadikoVaultDataV11Interface } from "./abi";

export type { ArkadikoVaultDataV11Contract } from "./types";

export const arkadikoVaultDataV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoVaultDataV11Contract>(
    ArkadikoVaultDataV11Interface,
    provider
  );
  return contract;
};

export const arkadikoVaultDataV11Info: Contract<ArkadikoVaultDataV11Contract> =
  {
    contract: arkadikoVaultDataV11Contract,
    address: "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH",
    contractFile: "contracts/external/arkadiko/arkadiko-vault-data-v1-1.clar",
  };
