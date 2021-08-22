import { BaseProvider } from "../../../../lib/providers/base-provider";
import { proxy } from "../../../../lib/test-utils/proxy";
import { Contract } from "../../../../lib/types";
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
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "clarity/contracts/external/arkadiko/arkadiko-vault-data-v1-1.clar",
  };
