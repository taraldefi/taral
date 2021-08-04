import { Contract } from "../../../../shared/types";
import { proxy } from "../../../../shared/test-utils/proxy";
import { BaseProvider } from "../../../../shared/providers/base-provider";

import type { ArkadikoVaultTraitV1Contract } from "./types";
import { ArkadikoVaultTraitV1Interface } from "./abi";

export type { ArkadikoVaultTraitV1Contract } from "./types";

export const arkadikoVaultTraitV1Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoVaultTraitV1Contract>(
    ArkadikoVaultTraitV1Interface,
    provider
  );
  return contract;
};

export const arkadikoVaultTraitV1Info: Contract<ArkadikoVaultTraitV1Contract> =
  {
    contract: arkadikoVaultTraitV1Contract,
    address: "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH",
    contractFile: "contracts/external/arkadiko/arkadiko-vault-trait-v1.clar",
  };
