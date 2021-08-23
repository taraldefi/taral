import { BaseProvider } from "../../../../../providers/base-provider";
import { proxy } from "../../../../proxy";
import { Contract } from "../../../../../types";
import { BnsInterface } from "./abi";
import type { BnsContract } from "./types";

export type { BnsContract } from "./types";

export const bnsContract = (provider: BaseProvider) => {
  const contract = proxy<BnsContract>(BnsInterface, provider);
  return contract;
};

export const bnsInfo: Contract<BnsContract> = {
  contract: bnsContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "clarity/lib/test-utils/contracts/boot/bns.clar",
};
