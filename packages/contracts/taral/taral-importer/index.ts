import {
  NodeContract,
  WebContract,
  nodeProxy,
  webProxy,
  BaseNodeProvider,
  BaseWebProvider,
} from "lib-shared";
import type { TaralImporterContract } from "./types";
import { TaralImporterInterface } from "./abi";
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
