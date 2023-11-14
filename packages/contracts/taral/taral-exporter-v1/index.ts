import {
  NodeContract,
  WebContract,
  nodeProxy,
  webProxy,
  BaseNodeProvider,
  BaseWebProvider,
} from "lib-shared";
import type { TaralExporterV1Contract } from "./types";
import { TaralExporterV1Interface } from "./abi";
export type { TaralExporterV1Contract } from "./types";

export const nodeTaralExporterV1Contract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<TaralExporterV1Contract>(
    TaralExporterV1Interface,
    provider,
  );
  return contract;
};

export const nodeTaralExporterV1Info: NodeContract<TaralExporterV1Contract> = {
  contract: nodeTaralExporterV1Contract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/taral-exporter-v1.clar",
};

export const webTaralExporterV1Contract = (provider: BaseWebProvider) => {
  const contract = webProxy<TaralExporterV1Contract>(
    TaralExporterV1Interface,
    provider,
  );
  return contract;
};

export const webTaralExporterV1Info: WebContract<TaralExporterV1Contract> = {
  contract: webTaralExporterV1Contract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/taral-exporter-v1.clar",
};
