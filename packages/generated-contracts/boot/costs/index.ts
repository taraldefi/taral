import { BaseProvider, Contract, proxy } from "lib-shared";
import { CostsInterface } from "./abi";
import type { CostsContract } from "./types";
export type { CostsContract } from "./types";

export const costsContract = (provider: BaseProvider) => {
  const contract = proxy<CostsContract>(CostsInterface, provider);
  return contract;
};

export const costsInfo: Contract<CostsContract> = {
  contract: costsContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/boot/costs.clar",
};
