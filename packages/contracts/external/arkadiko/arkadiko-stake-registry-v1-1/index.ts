import {
    BaseNodeProvider,
    BaseWebProvider,
    NodeContract,
    nodeProxy,
    WebContract,
    webProxy
} from "lib-shared";
import { ArkadikoStakeRegistryV11Interface } from "./abi";
import type { ArkadikoStakeRegistryV11Contract } from "./types";
export type { ArkadikoStakeRegistryV11Contract } from "./types";

export const nodeArkadikoStakeRegistryV11Contract = (
    provider: BaseNodeProvider
) => {
    const contract = nodeProxy<ArkadikoStakeRegistryV11Contract>(
        ArkadikoStakeRegistryV11Interface,
        provider
    );
    return contract;
};

export const nodeArkadikoStakeRegistryV11Info: NodeContract<ArkadikoStakeRegistryV11Contract> =
{
    contract: nodeArkadikoStakeRegistryV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
        "packages/clarity/contracts/external/arkadiko/arkadiko-stake-registry-v1-1.clar",
};

export const webArkadikoStakeRegistryV11Contract = (
    provider: BaseWebProvider
) => {
    const contract = webProxy<ArkadikoStakeRegistryV11Contract>(
        ArkadikoStakeRegistryV11Interface,
        provider
    );
    return contract;
};

export const webArkadikoStakeRegistryV11Info: WebContract<ArkadikoStakeRegistryV11Contract> =
{
    contract: webArkadikoStakeRegistryV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
        "packages/clarity/contracts/external/arkadiko/arkadiko-stake-registry-v1-1.clar",
};
