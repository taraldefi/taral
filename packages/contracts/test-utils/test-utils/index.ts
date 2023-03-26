import {
    BaseNodeProvider,
    BaseWebProvider, NodeContract, nodeProxy, WebContract, webProxy
} from "lib-shared";
import { TestUtilsInterface } from "./abi";
import type { TestUtilsContract } from "./types";
export type { TestUtilsContract } from "./types";

export const nodeTestUtilsContract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<TestUtilsContract>(TestUtilsInterface, provider);
    return contract;
};

export const nodeTestUtilsInfo: NodeContract<TestUtilsContract> = {
    contract: nodeTestUtilsContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile: "packages/clarity/contracts/test-utils/test-utils.clar",
};

export const webTestUtilsContract = (provider: BaseWebProvider) => {
    const contract = webProxy<TestUtilsContract>(TestUtilsInterface, provider);
    return contract;
};

export const webTestUtilsInfo: WebContract<TestUtilsContract> = {
    contract: webTestUtilsContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile: "packages/clarity/contracts/test-utils/test-utils.clar",
};
