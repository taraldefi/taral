import {
    BaseNodeProvider,
    BaseWebProvider,
    NodeContract,
    nodeProxy,
    WebContract,
    webProxy
} from "lib-shared";
import { InsurancePoolOracleInterface } from "./abi";
import type { InsurancePoolOracleContract } from "./types";
export type { InsurancePoolOracleContract } from "./types";

export const nodeInsurancePoolOracleContract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<InsurancePoolOracleContract>(
        InsurancePoolOracleInterface,
        provider
    );
    return contract;
};

export const nodeInsurancePoolOracleInfo: NodeContract<InsurancePoolOracleContract> =
{
    contract: nodeInsurancePoolOracleContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile: "packages/clarity/contracts/taral/insurance-pool-oracle.clar",
};

export const webInsurancePoolOracleContract = (provider: BaseWebProvider) => {
    const contract = webProxy<InsurancePoolOracleContract>(
        InsurancePoolOracleInterface,
        provider
    );
    return contract;
};

export const webInsurancePoolOracleInfo: WebContract<InsurancePoolOracleContract> =
{
    contract: webInsurancePoolOracleContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile: "packages/clarity/contracts/taral/insurance-pool-oracle.clar",
};
