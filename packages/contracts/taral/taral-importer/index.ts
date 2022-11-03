import {
  BaseNodeProvider,
  BaseWebProvider,
  NodeContract,
  nodeProxy,
  WebContract,
  webProxy,
} from "lib-shared";
import { TaralImporterInterface } from "./abi";
import type { TaralImporterContract } from "./types";
export type { TaralImporterContract } from "./types";

export const nodeTaralImporterContract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<TaralImporterContract>(
    TaralImporterInterface,
    provider
  );
  return contract;
};

export const nodeTaralImporterInfo: NodeContract<TaralImporterContract> = {
  contract: nodeTaralImporterContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/taral-importer.clar",
};

export const webTaralImporterContract = (provider: BaseWebProvider) => {
  const contract = webProxy<TaralImporterContract>(
    TaralImporterInterface,
    provider
  );
  return contract;
};

export const webTaralImporterInfo: WebContract<TaralImporterContract> = {
  contract: webTaralImporterContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/taral-importer.clar",
};
