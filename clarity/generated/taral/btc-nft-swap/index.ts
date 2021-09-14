import { Contract } from "../../../lib/types";
import { proxy } from "../../../lib/test-utils/proxy";
import { BaseProvider } from "../../../lib/providers/base-provider";

import type { BtcNftSwapContract } from "./types";
import { BtcNftSwapInterface } from "./abi";

export type { BtcNftSwapContract } from "./types";

export const btcNftSwapContract = (provider: BaseProvider) => {
  const contract = proxy<BtcNftSwapContract>(BtcNftSwapInterface, provider);
  return contract;
};

export const btcNftSwapInfo: Contract<BtcNftSwapContract> = {
  contract: btcNftSwapContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "clarity/contracts/taral/btc-nft-swap.clar",
};
