import { BaseProvider } from "../../../../lib/providers/base-provider";
import { proxy } from "../../../../lib/test-utils/proxy";
import { Contract } from "../../../../lib/types";
import { ArkadikoVaultManagerTraitV1Interface } from "./abi";
import type { ArkadikoVaultManagerTraitV1Contract } from "./types";

export type { ArkadikoVaultManagerTraitV1Contract } from "./types";

export const arkadikoVaultManagerTraitV1Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoVaultManagerTraitV1Contract>(
    ArkadikoVaultManagerTraitV1Interface,
    provider
  );
  return contract;
};

export const arkadikoVaultManagerTraitV1Info: Contract<ArkadikoVaultManagerTraitV1Contract> =
  {
    contract: arkadikoVaultManagerTraitV1Contract,
    address: "ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR",
    contractFile:
      "clarity/contracts/external/arkadiko/arkadiko-vault-manager-trait-v1.clar",
  };
