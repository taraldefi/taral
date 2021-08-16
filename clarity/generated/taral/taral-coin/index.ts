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
  address: "ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR",
  contractFile: "clarity/contracts/taral/taral-coin.clar",
};
