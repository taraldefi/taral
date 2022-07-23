import {
    BaseNodeProvider,
    BaseWebProvider,
    NodeContract,
    nodeProxy,
    WebContract,
    webProxy
} from "lib-shared";
import { ArkadikoVaultRewardsV11Interface } from "./abi";
import type { ArkadikoVaultRewardsV11Contract } from "./types";
export type { ArkadikoVaultRewardsV11Contract } from "./types";

export const nodeArkadikoVaultRewardsV11Contract = (
    provider: BaseNodeProvider
) => {
    const contract = nodeProxy<ArkadikoVaultRewardsV11Contract>(
        ArkadikoVaultRewardsV11Interface,
        provider
    );
    return contract;
};

export const nodeArkadikoVaultRewardsV11Info: NodeContract<ArkadikoVaultRewardsV11Contract> =
{
    contract: nodeArkadikoVaultRewardsV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
        "packages/clarity/contracts/external/arkadiko/arkadiko-vault-rewards-v1-1.clar",
};

export const webArkadikoVaultRewardsV11Contract = (
    provider: BaseWebProvider
) => {
    const contract = webProxy<ArkadikoVaultRewardsV11Contract>(
        ArkadikoVaultRewardsV11Interface,
        provider
    );
    return contract;
};

export const webArkadikoVaultRewardsV11Info: WebContract<ArkadikoVaultRewardsV11Contract> =
{
    contract: webArkadikoVaultRewardsV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
        "packages/clarity/contracts/external/arkadiko/arkadiko-vault-rewards-v1-1.clar",
};
