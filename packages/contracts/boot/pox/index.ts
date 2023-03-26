import {
    BaseNodeProvider,
    BaseWebProvider, NodeContract, nodeProxy, WebContract, webProxy
} from "lib-shared";
import { PoxInterface } from "./abi";
import type { PoxContract } from "./types";
export type { PoxContract } from "./types";

export const nodePoxContract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<PoxContract>(PoxInterface, provider);
    return contract;
};

export const nodePoxInfo: NodeContract<PoxContract> = {
    contract: nodePoxContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile: "packages/clarity/contracts/boot/pox.clar",
};

export const webPoxContract = (provider: BaseWebProvider) => {
    const contract = webProxy<PoxContract>(PoxInterface, provider);
    return contract;
};

export const webPoxInfo: WebContract<PoxContract> = {
    contract: webPoxContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile: "packages/clarity/contracts/boot/pox.clar",
};
