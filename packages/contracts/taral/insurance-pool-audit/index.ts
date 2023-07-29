import {
  NodeContract,
  WebContract,
  nodeProxy,
  webProxy,
  BaseNodeProvider,
  BaseWebProvider,
} from "lib-shared";
import type { InsurancePoolAuditContract } from "./types";
import { InsurancePoolAuditInterface } from "./abi";
export type { InsurancePoolAuditContract } from "./types";

export const nodeInsurancePoolAuditContract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<InsurancePoolAuditContract>(
    InsurancePoolAuditInterface,
    provider
  );
  return contract;
};

export const nodeInsurancePoolAuditInfo: NodeContract<InsurancePoolAuditContract> =
  {
    contract: nodeInsurancePoolAuditContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile: "packages/clarity/contracts/taral/insurance-pool-audit.clar",
  };

export const webInsurancePoolAuditContract = (provider: BaseWebProvider) => {
  const contract = webProxy<InsurancePoolAuditContract>(
    InsurancePoolAuditInterface,
    provider
  );
  return contract;
};

export const webInsurancePoolAuditInfo: WebContract<InsurancePoolAuditContract> =
  {
    contract: webInsurancePoolAuditContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile: "packages/clarity/contracts/taral/insurance-pool-audit.clar",
  };
