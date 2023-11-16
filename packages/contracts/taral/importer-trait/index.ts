import {
  NodeContract,
  WebContract,
  nodeProxy,
  webProxy,
  BaseNodeProvider,
  BaseWebProvider,
} from "lib-shared";
import type { ImporterTraitContract } from "./types";
import { ImporterTraitInterface } from "./abi";
export type { ImporterTraitContract } from "./types";

export const nodeImporterTraitContract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<ImporterTraitContract>(
    ImporterTraitInterface,
    provider,
  );
  return contract;
};

export const nodeImporterTraitInfo: NodeContract<ImporterTraitContract> = {
  contract: nodeImporterTraitContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/importer-trait.clar",
};

export const webImporterTraitContract = (provider: BaseWebProvider) => {
  const contract = webProxy<ImporterTraitContract>(
    ImporterTraitInterface,
    provider,
  );
  return contract;
};

export const webImporterTraitInfo: WebContract<ImporterTraitContract> = {
  contract: webImporterTraitContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/importer-trait.clar",
};
