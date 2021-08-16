import { BaseProvider } from "../../../../lib/providers/base-provider";
import { proxy } from "../../../../lib/test-utils/proxy";
import { Contract } from "../../../../lib/types";
import { ArkadikoVaultTraitV1Interface } from "./abi";
import type { ArkadikoVaultTraitV1Contract } from "./types";

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
    address: "ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR",
    contractFile:
      "clarity/contracts/external/arkadiko/arkadiko-vault-trait-v1.clar",
  };
