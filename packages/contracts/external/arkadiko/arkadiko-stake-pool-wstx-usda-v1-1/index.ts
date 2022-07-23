import {
    BaseNodeProvider,
    BaseWebProvider,
    NodeContract,
    nodeProxy,
    WebContract,
    webProxy
} from "lib-shared";
import { ArkadikoStakePoolWstxUsdaV11Interface } from "./abi";
import type { ArkadikoStakePoolWstxUsdaV11Contract } from "./types";
export type { ArkadikoStakePoolWstxUsdaV11Contract } from "./types";

export const nodeArkadikoStakePoolWstxUsdaV11Contract = (
    provider: BaseNodeProvider
) => {
    const contract = nodeProxy<ArkadikoStakePoolWstxUsdaV11Contract>(
        ArkadikoStakePoolWstxUsdaV11Interface,
        provider
    );
    return contract;
};

export const nodeArkadikoStakePoolWstxUsdaV11Info: NodeContract<ArkadikoStakePoolWstxUsdaV11Contract> =
{
    contract: nodeArkadikoStakePoolWstxUsdaV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
        "packages/clarity/contracts/external/arkadiko/arkadiko-stake-pool-wstx-usda-v1-1.clar",
};

export const webArkadikoStakePoolWstxUsdaV11Contract = (
    provider: BaseWebProvider
) => {
    const contract = webProxy<ArkadikoStakePoolWstxUsdaV11Contract>(
        ArkadikoStakePoolWstxUsdaV11Interface,
        provider
    );
    return contract;
};

export const webArkadikoStakePoolWstxUsdaV11Info: WebContract<ArkadikoStakePoolWstxUsdaV11Contract> =
{
    contract: webArkadikoStakePoolWstxUsdaV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
        "packages/clarity/contracts/external/arkadiko/arkadiko-stake-pool-wstx-usda-v1-1.clar",
};
