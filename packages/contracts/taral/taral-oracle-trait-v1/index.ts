import {
  BaseNodeProvider,
  BaseWebProvider,
  NodeContract,
  nodeProxy,
  WebContract,
  webProxy,
} from "lib-shared";
import { TaralOracleTraitV1Interface } from "./abi";
import type { TaralOracleTraitV1Contract } from "./types";
export type { TaralOracleTraitV1Contract } from "./types";

export const nodeTaralOracleTraitV1Contract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<TaralOracleTraitV1Contract>(
    TaralOracleTraitV1Interface,
    provider
  );
  return contract;
};

export const nodeTaralOracleTraitV1Info: NodeContract<TaralOracleTraitV1Contract> =
  {
    contract: nodeTaralOracleTraitV1Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile: "packages/clarity/contracts/taral/taral-oracle-trait-v1.clar",
  };

export const webTaralOracleTraitV1Contract = (provider: BaseWebProvider) => {
  const contract = webProxy<TaralOracleTraitV1Contract>(
    TaralOracleTraitV1Interface,
    provider
  );
  return contract;
};

export const webTaralOracleTraitV1Info: WebContract<TaralOracleTraitV1Contract> =
  {
    contract: webTaralOracleTraitV1Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile: "packages/clarity/contracts/taral/taral-oracle-trait-v1.clar",
  };
