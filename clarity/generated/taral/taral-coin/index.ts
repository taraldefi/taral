import { BaseProvider } from "../../../lib/providers/base-provider";
import { proxy } from "../../../lib/test-utils/proxy";
import { Contract } from "../../../lib/types";
import { TaralCoinInterface } from "./abi";
import type { TaralCoinContract } from "./types";

export type { TaralCoinContract } from "./types";

export const taralCoinContract = (provider: BaseProvider) => {
  const contract = proxy<TaralCoinContract>(TaralCoinInterface, provider);
  return contract;
};

export const taralCoinInfo: Contract<TaralCoinContract> = {
  contract: taralCoinContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "clarity/contracts/taral/taral-coin.clar",
};
