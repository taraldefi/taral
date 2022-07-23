import {
    BaseNodeProvider,
    BaseWebProvider,
    NodeContract,
    nodeProxy,
    WebContract,
    webProxy
} from "lib-shared";
import { ArkadikoDaoInterface } from "./abi";
import type { ArkadikoDaoContract } from "./types";
export type { ArkadikoDaoContract } from "./types";

export const nodeArkadikoDaoContract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<ArkadikoDaoContract>(
        ArkadikoDaoInterface,
        provider
    );
    return contract;
};

export const nodeArkadikoDaoInfo: NodeContract<ArkadikoDaoContract> = {
    contract: nodeArkadikoDaoContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
        "packages/clarity/contracts/external/arkadiko/arkadiko-dao.clar",
};

export const webArkadikoDaoContract = (provider: BaseWebProvider) => {
    const contract = webProxy<ArkadikoDaoContract>(
        ArkadikoDaoInterface,
        provider
    );
    return contract;
};

export const webArkadikoDaoInfo: WebContract<ArkadikoDaoContract> = {
    contract: webArkadikoDaoContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
        "packages/clarity/contracts/external/arkadiko/arkadiko-dao.clar",
};
