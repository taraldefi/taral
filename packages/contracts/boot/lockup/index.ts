import {
    BaseNodeProvider,
    BaseWebProvider,
    NodeContract,
    nodeProxy,
    WebContract,
    webProxy
} from "lib-shared";
import { LockupInterface } from "./abi";
import type { LockupContract } from "./types";
export type { LockupContract } from "./types";

export const nodeLockupContract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<LockupContract>(LockupInterface, provider);
    return contract;
};

export const nodeLockupInfo: NodeContract<LockupContract> = {
    contract: nodeLockupContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile: "packages/clarity/contracts/boot/lockup.clar",
};

export const webLockupContract = (provider: BaseWebProvider) => {
    const contract = webProxy<LockupContract>(LockupInterface, provider);
    return contract;
};

export const webLockupInfo: WebContract<LockupContract> = {
    contract: webLockupContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile: "packages/clarity/contracts/boot/lockup.clar",
};
