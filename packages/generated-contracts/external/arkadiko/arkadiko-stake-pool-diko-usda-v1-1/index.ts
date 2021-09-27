import { BaseProvider, Contract, proxy } from "lib-shared";
import { ArkadikoStakePoolDikoUsdaV11Interface } from "./abi";
import type { ArkadikoStakePoolDikoUsdaV11Contract } from "./types";
export type { ArkadikoStakePoolDikoUsdaV11Contract } from "./types";

export const arkadikoStakePoolDikoUsdaV11Contract = (
  provider: BaseProvider
) => {
  const contract = proxy<ArkadikoStakePoolDikoUsdaV11Contract>(
    ArkadikoStakePoolDikoUsdaV11Interface,
    provider
  );
  return contract;
};

export const arkadikoStakePoolDikoUsdaV11Info: Contract<ArkadikoStakePoolDikoUsdaV11Contract> =
  {
    contract: arkadikoStakePoolDikoUsdaV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/external/arkadiko/arkadiko-stake-pool-diko-usda-v1-1.clar",
  };
