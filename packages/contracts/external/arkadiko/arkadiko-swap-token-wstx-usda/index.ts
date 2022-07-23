import {
    BaseNodeProvider,
    BaseWebProvider,
    NodeContract,
    nodeProxy,
    WebContract,
    webProxy
} from "lib-shared";
import { ArkadikoSwapTokenWstxUsdaInterface } from "./abi";
import type { ArkadikoSwapTokenWstxUsdaContract } from "./types";
export type { ArkadikoSwapTokenWstxUsdaContract } from "./types";

export const nodeArkadikoSwapTokenWstxUsdaContract = (
    provider: BaseNodeProvider
) => {
    const contract = nodeProxy<ArkadikoSwapTokenWstxUsdaContract>(
        ArkadikoSwapTokenWstxUsdaInterface,
        provider
    );
    return contract;
};

export const nodeArkadikoSwapTokenWstxUsdaInfo: NodeContract<ArkadikoSwapTokenWstxUsdaContract> =
{
    contract: nodeArkadikoSwapTokenWstxUsdaContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
        "packages/clarity/contracts/external/arkadiko/arkadiko-swap-token-wstx-usda.clar",
};

export const webArkadikoSwapTokenWstxUsdaContract = (
    provider: BaseWebProvider
) => {
    const contract = webProxy<ArkadikoSwapTokenWstxUsdaContract>(
        ArkadikoSwapTokenWstxUsdaInterface,
        provider
    );
    return contract;
};

export const webArkadikoSwapTokenWstxUsdaInfo: WebContract<ArkadikoSwapTokenWstxUsdaContract> =
{
    contract: webArkadikoSwapTokenWstxUsdaContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
        "packages/clarity/contracts/external/arkadiko/arkadiko-swap-token-wstx-usda.clar",
};
