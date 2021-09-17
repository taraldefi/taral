import { BaseProvider, Contract, proxy } from "taral-shared";
import { ArkadikoStakeRegistryV11Interface } from "./abi";
import type { ArkadikoStakeRegistryV11Contract } from "./types";
export type { ArkadikoStakeRegistryV11Contract } from "./types";

export const arkadikoStakeRegistryV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoStakeRegistryV11Contract>(
    ArkadikoStakeRegistryV11Interface,
    provider
  );
  return contract;
};

export const arkadikoStakeRegistryV11Info: Contract<ArkadikoStakeRegistryV11Contract> =
  {
    contract: arkadikoStakeRegistryV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "C:\biz\taral/packages/clarity/contracts/external/arkadiko/arkadiko-stake-registry-v1-1.clar",
  };
