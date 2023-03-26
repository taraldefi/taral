import {
    BaseNodeProvider,
    BaseWebProvider, NodeContract, nodeProxy, WebContract, webProxy
} from "lib-shared";
import { UsdaTokenInterface } from "./abi";
import type { UsdaTokenContract } from "./types";
export type { UsdaTokenContract } from "./types";

export const nodeUsdaTokenContract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<UsdaTokenContract>(UsdaTokenInterface, provider);
    return contract;
};

export const nodeUsdaTokenInfo: NodeContract<UsdaTokenContract> = {
    contract: nodeUsdaTokenContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile: "packages/clarity/contracts/external/arkadiko/usda-token.clar",
};

export const webUsdaTokenContract = (provider: BaseWebProvider) => {
    const contract = webProxy<UsdaTokenContract>(UsdaTokenInterface, provider);
    return contract;
};

export const webUsdaTokenInfo: WebContract<UsdaTokenContract> = {
    contract: webUsdaTokenContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile: "packages/clarity/contracts/external/arkadiko/usda-token.clar",
};
