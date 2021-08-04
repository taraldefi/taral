import { Contract } from "../../../../shared/types";
import { proxy } from "../../../../shared/test-utils/proxy";
import { BaseProvider } from "../../../../shared/providers/base-provider";

import type { ArkadikoAuctionEngineTraitV1Contract } from "./types";
import { ArkadikoAuctionEngineTraitV1Interface } from "./abi";

export type { ArkadikoAuctionEngineTraitV1Contract } from "./types";

export const arkadikoAuctionEngineTraitV1Contract = (
  provider: BaseProvider
) => {
  const contract = proxy<ArkadikoAuctionEngineTraitV1Contract>(
    ArkadikoAuctionEngineTraitV1Interface,
    provider
  );
  return contract;
};

export const arkadikoAuctionEngineTraitV1Info: Contract<ArkadikoAuctionEngineTraitV1Contract> =
  {
    contract: arkadikoAuctionEngineTraitV1Contract,
    address: "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH",
    contractFile:
      "contracts/external/arkadiko/arkadiko-auction-engine-trait-v1.clar",
  };
