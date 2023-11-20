import {
  NodeContract,
  WebContract,
  nodeProxy,
  webProxy,
  BaseNodeProvider,
  BaseWebProvider,
} from "lib-shared";
import type { TaralBankContract } from "./types";
import { TaralBankInterface } from "./abi";
export type { TaralBankContract } from "./types";

export const nodeTaralBankContract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<TaralBankContract>(TaralBankInterface, provider);
  return contract;
};

export const nodeTaralBankInfo: NodeContract<TaralBankContract> = {
  contract: nodeTaralBankContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/taral-bank.clar",
};

export const webTaralBankContract = (provider: BaseWebProvider) => {
  const contract = webProxy<TaralBankContract>(TaralBankInterface, provider);
  return contract;
};

export const webTaralBankInfo: WebContract<TaralBankContract> = {
  contract: webTaralBankContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/taral-bank.clar",
};
