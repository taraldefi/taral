import {
  NodeContract,
  WebContract,
  nodeProxy,
  webProxy,
  BaseNodeProvider,
  BaseWebProvider,
} from "lib-shared";
import type { ClarityBitcoinContract } from "./types";
import { ClarityBitcoinInterface } from "./abi";
export type { ClarityBitcoinContract } from "./types";

export const nodeClarityBitcoinContract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<ClarityBitcoinContract>(
    ClarityBitcoinInterface,
    provider,
  );
  return contract;
};

export const nodeClarityBitcoinInfo: NodeContract<ClarityBitcoinContract> = {
  contract: nodeClarityBitcoinContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/clarity-bitcoin.clar",
};

export const webClarityBitcoinContract = (provider: BaseWebProvider) => {
  const contract = webProxy<ClarityBitcoinContract>(
    ClarityBitcoinInterface,
    provider,
  );
  return contract;
};

export const webClarityBitcoinInfo: WebContract<ClarityBitcoinContract> = {
  contract: webClarityBitcoinContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/clarity-bitcoin.clar",
};
