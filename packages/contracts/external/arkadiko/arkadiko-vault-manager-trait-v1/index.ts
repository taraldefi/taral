import {
    BaseNodeProvider,
    BaseWebProvider,
    NodeContract,
    nodeProxy,
    WebContract,
    webProxy
} from "lib-shared";
import { ArkadikoVaultManagerTraitV1Interface } from "./abi";
import type { ArkadikoVaultManagerTraitV1Contract } from "./types";
export type { ArkadikoVaultManagerTraitV1Contract } from "./types";

export const nodeArkadikoVaultManagerTraitV1Contract = (
    provider: BaseNodeProvider
) => {
    const contract = nodeProxy<ArkadikoVaultManagerTraitV1Contract>(
        ArkadikoVaultManagerTraitV1Interface,
        provider
    );
    return contract;
};

export const nodeArkadikoVaultManagerTraitV1Info: NodeContract<ArkadikoVaultManagerTraitV1Contract> =
{
    contract: nodeArkadikoVaultManagerTraitV1Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
        "packages/clarity/contracts/external/arkadiko/arkadiko-vault-manager-trait-v1.clar",
};

export const webArkadikoVaultManagerTraitV1Contract = (
    provider: BaseWebProvider
) => {
    const contract = webProxy<ArkadikoVaultManagerTraitV1Contract>(
        ArkadikoVaultManagerTraitV1Interface,
        provider
    );
    return contract;
};

export const webArkadikoVaultManagerTraitV1Info: WebContract<ArkadikoVaultManagerTraitV1Contract> =
{
    contract: webArkadikoVaultManagerTraitV1Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
        "packages/clarity/contracts/external/arkadiko/arkadiko-vault-manager-trait-v1.clar",
};
