import {
  NodeContract,
  WebContract,
  nodeProxy,
  webProxy,
  BaseNodeProvider,
  BaseWebProvider,
} from "lib-shared";
import type { TaralExporterContract } from "./types";
import { TaralExporterInterface } from "./abi";
export type { TaralExporterContract } from "./types";

export const nodeTaralExporterContract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<TaralExporterContract>(
    TaralExporterInterface,
    provider,
  );
  return contract;
};

export const nodeTaralExporterInfo: NodeContract<TaralExporterContract> = {
  contract: nodeTaralExporterContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/taral-exporter.clar",
};

export const webTaralExporterContract = (provider: BaseWebProvider) => {
  const contract = webProxy<TaralExporterContract>(
    TaralExporterInterface,
    provider,
  );
  return contract;
};

export const webTaralExporterInfo: WebContract<TaralExporterContract> = {
  contract: webTaralExporterContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/taral-exporter.clar",
};
