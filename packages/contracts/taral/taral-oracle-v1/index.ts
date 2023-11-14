import {
  NodeContract,
  WebContract,
  nodeProxy,
  webProxy,
  BaseNodeProvider,
  BaseWebProvider,
} from "lib-shared";
import type { TaralOracleV1Contract } from "./types";
import { TaralOracleV1Interface } from "./abi";
export type { TaralOracleV1Contract } from "./types";

export const nodeTaralOracleV1Contract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<TaralOracleV1Contract>(
    TaralOracleV1Interface,
    provider,
  );
  return contract;
};

export const nodeTaralOracleV1Info: NodeContract<TaralOracleV1Contract> = {
  contract: nodeTaralOracleV1Contract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/taral-oracle-v1.clar",
};

export const webTaralOracleV1Contract = (provider: BaseWebProvider) => {
  const contract = webProxy<TaralOracleV1Contract>(
    TaralOracleV1Interface,
    provider,
  );
  return contract;
};

export const webTaralOracleV1Info: WebContract<TaralOracleV1Contract> = {
  contract: webTaralOracleV1Contract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/taral-oracle-v1.clar",
};
