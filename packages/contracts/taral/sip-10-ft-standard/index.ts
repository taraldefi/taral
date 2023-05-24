import {
    BaseNodeProvider,
    BaseWebProvider,
    NodeContract,
    nodeProxy,
    WebContract,
    webProxy
} from "lib-shared";
import { Sip10FtStandardInterface } from "./abi";
import type { Sip10FtStandardContract } from "./types";
export type { Sip10FtStandardContract } from "./types";

export const nodeSip10FtStandardContract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<Sip10FtStandardContract>(
        Sip10FtStandardInterface,
        provider
    );
    return contract;
};

export const nodeSip10FtStandardInfo: NodeContract<Sip10FtStandardContract> = {
    contract: nodeSip10FtStandardContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile: "packages/clarity/contracts/taral/sip-10-ft-standard.clar",
};

export const webSip10FtStandardContract = (provider: BaseWebProvider) => {
    const contract = webProxy<Sip10FtStandardContract>(
        Sip10FtStandardInterface,
        provider
    );
    return contract;
};

export const webSip10FtStandardInfo: WebContract<Sip10FtStandardContract> = {
    contract: webSip10FtStandardContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile: "packages/clarity/contracts/taral/sip-10-ft-standard.clar",
};
