import { Contract } from "../../../../lib/types";
import { proxy } from "../../../../lib/test-utils/proxy";
import { BaseProvider } from "../../../../lib/providers/base-provider";

import type { ArkadikoAuctionEngineV11Contract } from "./types";
import { ArkadikoAuctionEngineV11Interface } from "./abi";

export type { ArkadikoAuctionEngineV11Contract } from "./types";

export const arkadikoAuctionEngineV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoAuctionEngineV11Contract>(
    ArkadikoAuctionEngineV11Interface,
    provider
  );
  return contract;
};

export const arkadikoAuctionEngineV11Info: Contract<ArkadikoAuctionEngineV11Contract> =
  {
    contract: arkadikoAuctionEngineV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "clarity/contracts/external/arkadiko/arkadiko-auction-engine-v1-1.clar",
  };
