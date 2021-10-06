import { BaseProvider, Contract, proxy } from "lib-shared";
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
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/external/arkadiko/arkadiko-vault-manager-trait-v1.clar",
  };
