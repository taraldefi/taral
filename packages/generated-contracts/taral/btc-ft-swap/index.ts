import { BaseProvider, Contract, proxy } from "taral-shared";
import { BtcFtSwapInterface } from "./abi";
import type { BtcFtSwapContract } from "./types";
export type { BtcFtSwapContract } from "./types";

export const btcFtSwapContract = (provider: BaseProvider) => {
  const contract = proxy<BtcFtSwapContract>(BtcFtSwapInterface, provider);
  return contract;
};

export const btcFtSwapInfo: Contract<BtcFtSwapContract> = {
  contract: btcFtSwapContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/btc-ft-swap.clar",
};
