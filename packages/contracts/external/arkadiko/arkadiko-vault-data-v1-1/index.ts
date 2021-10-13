import {
  BaseNodeProvider,
  BaseWebProvider,
  NodeContract,
  nodeProxy,
  WebContract,
  webProxy,
} from "lib-shared";
import { ArkadikoVaultDataV11Interface } from "./abi";
import type { ArkadikoVaultDataV11Contract } from "./types";
export type { ArkadikoVaultDataV11Contract } from "./types";

export const nodeArkadikoVaultDataV11Contract = (
  provider: BaseNodeProvider
) => {
  const contract = nodeProxy<ArkadikoVaultDataV11Contract>(
    ArkadikoVaultDataV11Interface,
    provider
  );
  return contract;
};

export const nodeArkadikoVaultDataV11Info: NodeContract<ArkadikoVaultDataV11Contract> =
  {
    contract: nodeArkadikoVaultDataV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/external/arkadiko/arkadiko-vault-data-v1-1.clar",
  };

export const webArkadikoVaultDataV11Contract = (provider: BaseWebProvider) => {
  const contract = webProxy<ArkadikoVaultDataV11Contract>(
    ArkadikoVaultDataV11Interface,
    provider
  );
  return contract;
};

export const webArkadikoVaultDataV11Info: WebContract<ArkadikoVaultDataV11Contract> =
  {
    contract: webArkadikoVaultDataV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/external/arkadiko/arkadiko-vault-data-v1-1.clar",
  };
