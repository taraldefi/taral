import { BaseProvider } from "../../../../lib/providers/base-provider";
import { proxy } from "../../../../lib/test-utils/proxy";
import { Contract } from "../../../../lib/types";
import { ArkadikoAuctionEngineTraitV1Interface } from "./abi";
import type { ArkadikoAuctionEngineTraitV1Contract } from "./types";

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
    address: "ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR",
    contractFile:
      "clarity/contracts/external/arkadiko/arkadiko-auction-engine-trait-v1.clar",
  };
