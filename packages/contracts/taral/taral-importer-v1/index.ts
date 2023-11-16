import {
  NodeContract,
  WebContract,
  nodeProxy,
  webProxy,
  BaseNodeProvider,
  BaseWebProvider,
} from "lib-shared";
import type { TaralImporterV1Contract } from "./types";
import { TaralImporterV1Interface } from "./abi";
export type { TaralImporterV1Contract } from "./types";

export const nodeTaralImporterV1Contract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<TaralImporterV1Contract>(
    TaralImporterV1Interface,
    provider,
  );
  return contract;
};

export const nodeTaralImporterV1Info: NodeContract<TaralImporterV1Contract> = {
  contract: nodeTaralImporterV1Contract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/taral-importer-v1.clar",
};

export const webTaralImporterV1Contract = (provider: BaseWebProvider) => {
  const contract = webProxy<TaralImporterV1Contract>(
    TaralImporterV1Interface,
    provider,
  );
  return contract;
};

export const webTaralImporterV1Info: WebContract<TaralImporterV1Contract> = {
  contract: webTaralImporterV1Contract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/taral-importer-v1.clar",
};
