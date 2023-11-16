import {
  NodeContract,
  WebContract,
  nodeProxy,
  webProxy,
  BaseNodeProvider,
  BaseWebProvider,
} from "lib-shared";
import type { ExporterTraitContract } from "./types";
import { ExporterTraitInterface } from "./abi";
export type { ExporterTraitContract } from "./types";

export const nodeExporterTraitContract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<ExporterTraitContract>(
    ExporterTraitInterface,
    provider,
  );
  return contract;
};

export const nodeExporterTraitInfo: NodeContract<ExporterTraitContract> = {
  contract: nodeExporterTraitContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/exporter-trait.clar",
};

export const webExporterTraitContract = (provider: BaseWebProvider) => {
  const contract = webProxy<ExporterTraitContract>(
    ExporterTraitInterface,
    provider,
  );
  return contract;
};

export const webExporterTraitInfo: WebContract<ExporterTraitContract> = {
  contract: webExporterTraitContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/exporter-trait.clar",
};
