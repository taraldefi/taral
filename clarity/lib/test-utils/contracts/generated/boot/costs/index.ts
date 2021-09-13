import { BaseProvider } from "../../../../../providers/base-provider";
import { Contract } from "../../../../../types";
import { proxy } from "../../../../proxy";
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
  contractFile: "clarity/lib/test-utils/contracts/boot/costs.clar",
};
