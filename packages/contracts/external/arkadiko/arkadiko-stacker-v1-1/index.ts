import {
    BaseNodeProvider,
    BaseWebProvider,
    NodeContract,
    nodeProxy,
    WebContract,
    webProxy
} from "lib-shared";
import { ArkadikoStackerV11Interface } from "./abi";
import type { ArkadikoStackerV11Contract } from "./types";
export type { ArkadikoStackerV11Contract } from "./types";

export const nodeArkadikoStackerV11Contract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<ArkadikoStackerV11Contract>(
        ArkadikoStackerV11Interface,
        provider
    );
    return contract;
};

export const nodeArkadikoStackerV11Info: NodeContract<ArkadikoStackerV11Contract> =
{
    contract: nodeArkadikoStackerV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
        "packages/clarity/contracts/external/arkadiko/arkadiko-stacker-v1-1.clar",
};

export const webArkadikoStackerV11Contract = (provider: BaseWebProvider) => {
    const contract = webProxy<ArkadikoStackerV11Contract>(
        ArkadikoStackerV11Interface,
        provider
    );
    return contract;
};

export const webArkadikoStackerV11Info: WebContract<ArkadikoStackerV11Contract> =
{
    contract: webArkadikoStackerV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
        "packages/clarity/contracts/external/arkadiko/arkadiko-stacker-v1-1.clar",
};
