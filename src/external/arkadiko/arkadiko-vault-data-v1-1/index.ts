import { BaseProvider } from "../../../../shared/providers/base-provider";
import { proxy } from "../../../../shared/test-utils/proxy";
import { Contract } from "../../../../shared/types";
import { ArkadikoVaultDataV11Interface } from "./abi";
import type { ArkadikoVaultDataV11Contract } from "./types";

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
    address: "ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR",
    contractFile: "contracts/external/arkadiko/arkadiko-vault-data-v1-1.clar",
  };
