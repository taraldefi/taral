import {
    BaseNodeProvider,
    BaseWebProvider,
    NodeContract,
    nodeProxy,
    WebContract,
    webProxy
} from "lib-shared";
import { ArkadikoStakePoolDikoV11Interface } from "./abi";
import type { ArkadikoStakePoolDikoV11Contract } from "./types";
export type { ArkadikoStakePoolDikoV11Contract } from "./types";

export const nodeArkadikoStakePoolDikoV11Contract = (
    provider: BaseNodeProvider
) => {
    const contract = nodeProxy<ArkadikoStakePoolDikoV11Contract>(
        ArkadikoStakePoolDikoV11Interface,
        provider
    );
    return contract;
};

export const nodeArkadikoStakePoolDikoV11Info: NodeContract<ArkadikoStakePoolDikoV11Contract> =
{
    contract: nodeArkadikoStakePoolDikoV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
        "packages/clarity/contracts/external/arkadiko/arkadiko-stake-pool-diko-v1-1.clar",
};

export const webArkadikoStakePoolDikoV11Contract = (
    provider: BaseWebProvider
) => {
    const contract = webProxy<ArkadikoStakePoolDikoV11Contract>(
        ArkadikoStakePoolDikoV11Interface,
        provider
    );
    return contract;
};

export const webArkadikoStakePoolDikoV11Info: WebContract<ArkadikoStakePoolDikoV11Contract> =
{
    contract: webArkadikoStakePoolDikoV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
        "packages/clarity/contracts/external/arkadiko/arkadiko-stake-pool-diko-v1-1.clar",
};
