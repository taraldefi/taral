import {
    BaseNodeProvider,
    BaseWebProvider,
    NodeContract,
    nodeProxy,
    WebContract,
    webProxy
} from "lib-shared";
import { InsurancePoolAuditCompactInterface } from "./abi";
import type { InsurancePoolAuditCompactContract } from "./types";
export type { InsurancePoolAuditCompactContract } from "./types";

export const nodeInsurancePoolAuditCompactContract = (
    provider: BaseNodeProvider
) => {
    const contract = nodeProxy<InsurancePoolAuditCompactContract>(
        InsurancePoolAuditCompactInterface,
        provider
    );
    return contract;
};

export const nodeInsurancePoolAuditCompactInfo: NodeContract<InsurancePoolAuditCompactContract> =
{
    contract: nodeInsurancePoolAuditCompactContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
        "packages/clarity/contracts/taral/insurance-pool-audit-compact.clar",
};

export const webInsurancePoolAuditCompactContract = (
    provider: BaseWebProvider
) => {
    const contract = webProxy<InsurancePoolAuditCompactContract>(
        InsurancePoolAuditCompactInterface,
        provider
    );
    return contract;
};

export const webInsurancePoolAuditCompactInfo: WebContract<InsurancePoolAuditCompactContract> =
{
    contract: webInsurancePoolAuditCompactContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
        "packages/clarity/contracts/taral/insurance-pool-audit-compact.clar",
};
