import {
    BaseNodeProvider,
    BaseWebProvider,
    NodeContract,
    nodeProxy,
    WebContract,
    webProxy
} from "lib-shared";
import { BtcNftSwapInterface } from "./abi";
import type { BtcNftSwapContract } from "./types";
export type { BtcNftSwapContract } from "./types";

export const nodeBtcNftSwapContract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<BtcNftSwapContract>(BtcNftSwapInterface, provider);
    return contract;
};

export const nodeBtcNftSwapInfo: NodeContract<BtcNftSwapContract> = {
    contract: nodeBtcNftSwapContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile: "packages/clarity/contracts/taral/btc-nft-swap.clar",
};

export const webBtcNftSwapContract = (provider: BaseWebProvider) => {
    const contract = webProxy<BtcNftSwapContract>(BtcNftSwapInterface, provider);
    return contract;
};

export const webBtcNftSwapInfo: WebContract<BtcNftSwapContract> = {
    contract: webBtcNftSwapContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile: "packages/clarity/contracts/taral/btc-nft-swap.clar",
};
