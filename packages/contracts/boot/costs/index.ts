import {
  BaseNodeProvider,
  BaseWebProvider,
  NodeContract,
  nodeProxy,
  WebContract,
  webProxy,
} from "lib-shared";
import { CostsInterface } from "./abi";
import type { CostsContract } from "./types";
export type { CostsContract } from "./types";

export const nodeCostsContract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<CostsContract>(CostsInterface, provider);
  return contract;
};

export const nodeCostsInfo: NodeContract<CostsContract> = {
  contract: nodeCostsContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/boot/costs.clar",
};

export const webCostsContract = (provider: BaseWebProvider) => {
  const contract = webProxy<CostsContract>(CostsInterface, provider);
  return contract;
};

export const webCostsInfo: WebContract<CostsContract> = {
  contract: webCostsContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/boot/costs.clar",
};
