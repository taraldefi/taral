import {
    BaseNodeProvider,
    BaseWebProvider,
    NodeContract,
    nodeProxy,
    WebContract,
    webProxy
} from "lib-shared";
import { ArkadikoAuctionEngineTraitV1Interface } from "./abi";
import type { ArkadikoAuctionEngineTraitV1Contract } from "./types";
export type { ArkadikoAuctionEngineTraitV1Contract } from "./types";

export const nodeArkadikoAuctionEngineTraitV1Contract = (
    provider: BaseNodeProvider
) => {
    const contract = nodeProxy<ArkadikoAuctionEngineTraitV1Contract>(
        ArkadikoAuctionEngineTraitV1Interface,
        provider
    );
    return contract;
};

export const nodeArkadikoAuctionEngineTraitV1Info: NodeContract<ArkadikoAuctionEngineTraitV1Contract> =
{
    contract: nodeArkadikoAuctionEngineTraitV1Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
        "packages/clarity/contracts/external/arkadiko/arkadiko-auction-engine-trait-v1.clar",
};

export const webArkadikoAuctionEngineTraitV1Contract = (
    provider: BaseWebProvider
) => {
    const contract = webProxy<ArkadikoAuctionEngineTraitV1Contract>(
        ArkadikoAuctionEngineTraitV1Interface,
        provider
    );
    return contract;
};

export const webArkadikoAuctionEngineTraitV1Info: WebContract<ArkadikoAuctionEngineTraitV1Contract> =
{
    contract: webArkadikoAuctionEngineTraitV1Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
        "packages/clarity/contracts/external/arkadiko/arkadiko-auction-engine-trait-v1.clar",
};
