import {
    BaseNodeProvider,
    BaseWebProvider,
    NodeContract,
    nodeProxy,
    WebContract,
    webProxy
} from "lib-shared";
import { ArkadikoVaultTraitV1Interface } from "./abi";
import type { ArkadikoVaultTraitV1Contract } from "./types";
export type { ArkadikoVaultTraitV1Contract } from "./types";

export const nodeArkadikoVaultTraitV1Contract = (
    provider: BaseNodeProvider
) => {
    const contract = nodeProxy<ArkadikoVaultTraitV1Contract>(
        ArkadikoVaultTraitV1Interface,
        provider
    );
    return contract;
};

export const nodeArkadikoVaultTraitV1Info: NodeContract<ArkadikoVaultTraitV1Contract> =
{
    contract: nodeArkadikoVaultTraitV1Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
        "packages/clarity/contracts/external/arkadiko/arkadiko-vault-trait-v1.clar",
};

export const webArkadikoVaultTraitV1Contract = (provider: BaseWebProvider) => {
    const contract = webProxy<ArkadikoVaultTraitV1Contract>(
        ArkadikoVaultTraitV1Interface,
        provider
    );
    return contract;
};

export const webArkadikoVaultTraitV1Info: WebContract<ArkadikoVaultTraitV1Contract> =
{
    contract: webArkadikoVaultTraitV1Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
        "packages/clarity/contracts/external/arkadiko/arkadiko-vault-trait-v1.clar",
};
