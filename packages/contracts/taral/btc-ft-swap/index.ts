import {
  NodeContract,
  WebContract,
  nodeProxy,
  webProxy,
  BaseNodeProvider,
  BaseWebProvider,
} from "lib-shared";
import type { BtcFtSwapContract } from "./types";
import { BtcFtSwapInterface } from "./abi";
export type { BtcFtSwapContract } from "./types";

export const nodeBtcFtSwapContract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<BtcFtSwapContract>(BtcFtSwapInterface, provider);
  return contract;
};

export const nodeBtcFtSwapInfo: NodeContract<BtcFtSwapContract> = {
  contract: nodeBtcFtSwapContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/btc-ft-swap.clar",
};

export const webBtcFtSwapContract = (provider: BaseWebProvider) => {
  const contract = webProxy<BtcFtSwapContract>(BtcFtSwapInterface, provider);
  return contract;
};

export const webBtcFtSwapInfo: WebContract<BtcFtSwapContract> = {
  contract: webBtcFtSwapContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/btc-ft-swap.clar",
};
