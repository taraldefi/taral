import { Contract } from "../../../../lib/types";
import { proxy } from "../../../../lib/test-utils/proxy";
import { BaseProvider } from "../../../../lib/providers/base-provider";

import type { ArkadikoStakePoolWstxDikoV11Contract } from "./types";
import { ArkadikoStakePoolWstxDikoV11Interface } from "./abi";

export type { ArkadikoStakePoolWstxDikoV11Contract } from "./types";

export const arkadikoStakePoolWstxDikoV11Contract = (
  provider: BaseProvider
) => {
  const contract = proxy<ArkadikoStakePoolWstxDikoV11Contract>(
    ArkadikoStakePoolWstxDikoV11Interface,
    provider
  );
  return contract;
};

export const arkadikoStakePoolWstxDikoV11Info: Contract<ArkadikoStakePoolWstxDikoV11Contract> =
  {
    contract: arkadikoStakePoolWstxDikoV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "clarity/contracts/external/arkadiko/arkadiko-stake-pool-wstx-diko-v1-1.clar",
  };
