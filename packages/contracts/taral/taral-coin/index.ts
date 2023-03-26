import {
    BaseNodeProvider,
    BaseWebProvider, NodeContract, nodeProxy, WebContract, webProxy
} from "lib-shared";
import { TaralCoinInterface } from "./abi";
import type { TaralCoinContract } from "./types";
export type { TaralCoinContract } from "./types";

export const nodeTaralCoinContract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<TaralCoinContract>(TaralCoinInterface, provider);
    return contract;
};

export const nodeTaralCoinInfo: NodeContract<TaralCoinContract> = {
    contract: nodeTaralCoinContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile: "packages/clarity/contracts/taral/taral-coin.clar",
};

export const webTaralCoinContract = (provider: BaseWebProvider) => {
    const contract = webProxy<TaralCoinContract>(TaralCoinInterface, provider);
    return contract;
};

export const webTaralCoinInfo: WebContract<TaralCoinContract> = {
    contract: webTaralCoinContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile: "packages/clarity/contracts/taral/taral-coin.clar",
};
