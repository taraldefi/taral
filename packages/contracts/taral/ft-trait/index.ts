import {
  NodeContract,
  WebContract,
  nodeProxy,
  webProxy,
  BaseNodeProvider,
  BaseWebProvider,
} from "lib-shared";
import type { FtTraitContract } from "./types";
import { FtTraitInterface } from "./abi";
export type { FtTraitContract } from "./types";

export const nodeFtTraitContract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<FtTraitContract>(FtTraitInterface, provider);
  return contract;
};

export const nodeFtTraitInfo: NodeContract<FtTraitContract> = {
  contract: nodeFtTraitContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/ft-trait.clar",
};

export const webFtTraitContract = (provider: BaseWebProvider) => {
  const contract = webProxy<FtTraitContract>(FtTraitInterface, provider);
  return contract;
};

export const webFtTraitInfo: WebContract<FtTraitContract> = {
  contract: webFtTraitContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/ft-trait.clar",
};
