import { BaseProvider } from "../../../../lib/providers/base-provider";
import { proxy } from "../../../../lib/test-utils/proxy";
import { Contract } from "../../../../lib/types";
import { ArkadikoStakePoolWstxUsdaV11Interface } from "./abi";
import type { ArkadikoStakePoolWstxUsdaV11Contract } from "./types";

export type { ArkadikoStakePoolWstxUsdaV11Contract } from "./types";

export const arkadikoStakePoolWstxUsdaV11Contract = (
  provider: BaseProvider
) => {
  const contract = proxy<ArkadikoStakePoolWstxUsdaV11Contract>(
    ArkadikoStakePoolWstxUsdaV11Interface,
    provider
  );
  return contract;
};

export const arkadikoStakePoolWstxUsdaV11Info: Contract<ArkadikoStakePoolWstxUsdaV11Contract> =
  {
    contract: arkadikoStakePoolWstxUsdaV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "clarity/contracts/external/arkadiko/arkadiko-stake-pool-wstx-usda-v1-1.clar",
  };
