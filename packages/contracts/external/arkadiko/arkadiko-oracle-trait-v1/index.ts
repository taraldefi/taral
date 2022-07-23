import {
    BaseNodeProvider,
    BaseWebProvider,
    NodeContract,
    nodeProxy,
    WebContract,
    webProxy
} from "lib-shared";
import { ArkadikoOracleTraitV1Interface } from "./abi";
import type { ArkadikoOracleTraitV1Contract } from "./types";
export type { ArkadikoOracleTraitV1Contract } from "./types";

export const nodeArkadikoOracleTraitV1Contract = (
    provider: BaseNodeProvider
) => {
    const contract = nodeProxy<ArkadikoOracleTraitV1Contract>(
        ArkadikoOracleTraitV1Interface,
        provider
    );
    return contract;
};

export const nodeArkadikoOracleTraitV1Info: NodeContract<ArkadikoOracleTraitV1Contract> =
{
    contract: nodeArkadikoOracleTraitV1Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
        "packages/clarity/contracts/external/arkadiko/arkadiko-oracle-trait-v1.clar",
};

export const webArkadikoOracleTraitV1Contract = (provider: BaseWebProvider) => {
    const contract = webProxy<ArkadikoOracleTraitV1Contract>(
        ArkadikoOracleTraitV1Interface,
        provider
    );
    return contract;
};

export const webArkadikoOracleTraitV1Info: WebContract<ArkadikoOracleTraitV1Contract> =
{
    contract: webArkadikoOracleTraitV1Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
        "packages/clarity/contracts/external/arkadiko/arkadiko-oracle-trait-v1.clar",
};
