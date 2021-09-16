import { BaseProvider } from "../../../lib/providers/base-provider";
import { proxy } from "../../../lib/test-utils/proxy";
import { Contract } from "../../../lib/types";
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
  contractFile: "clarity/contracts/taral/btc-ft-swap.clar",
};
