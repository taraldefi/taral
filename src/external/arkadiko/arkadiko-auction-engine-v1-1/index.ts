import { Contract } from "../../../../shared/types";
import { proxy } from "../../../../shared/test-utils/proxy";
import { BaseProvider } from "../../../../shared/providers/base-provider";

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
    address: "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH",
    contractFile:
      "contracts/external/arkadiko/arkadiko-auction-engine-v1-1.clar",
  };
