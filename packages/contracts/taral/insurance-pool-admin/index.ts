import {
  NodeContract,
  WebContract,
  nodeProxy,
  webProxy,
  BaseNodeProvider,
  BaseWebProvider,
} from "lib-shared";
import type { InsurancePoolAdminContract } from "./types";
import { InsurancePoolAdminInterface } from "./abi";
export type { InsurancePoolAdminContract } from "./types";

export const nodeInsurancePoolAdminContract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<InsurancePoolAdminContract>(
    InsurancePoolAdminInterface,
    provider,
  );
  return contract;
};

export const nodeInsurancePoolAdminInfo: NodeContract<InsurancePoolAdminContract> =
  {
    contract: nodeInsurancePoolAdminContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile: "packages/clarity/contracts/taral/insurance-pool-admin.clar",
  };

export const webInsurancePoolAdminContract = (provider: BaseWebProvider) => {
  const contract = webProxy<InsurancePoolAdminContract>(
    InsurancePoolAdminInterface,
    provider,
  );
  return contract;
};

export const webInsurancePoolAdminInfo: WebContract<InsurancePoolAdminContract> =
  {
    contract: webInsurancePoolAdminContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile: "packages/clarity/contracts/taral/insurance-pool-admin.clar",
  };
