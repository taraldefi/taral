import { Contract } from "../../../../lib/types";
import { proxy } from "../../../../lib/test-utils/proxy";
import { BaseProvider } from "../../../../lib/providers/base-provider";

import type { ArkadikoStakePoolDikoV11Contract } from "./types";
import { ArkadikoStakePoolDikoV11Interface } from "./abi";

export type { ArkadikoStakePoolDikoV11Contract } from "./types";

export const arkadikoStakePoolDikoV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoStakePoolDikoV11Contract>(
    ArkadikoStakePoolDikoV11Interface,
    provider
  );
  return contract;
};

export const arkadikoStakePoolDikoV11Info: Contract<ArkadikoStakePoolDikoV11Contract> =
  {
    contract: arkadikoStakePoolDikoV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "clarity/contracts/external/arkadiko/arkadiko-stake-pool-diko-v1-1.clar",
  };
