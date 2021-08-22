import { BaseProvider } from "../../../lib/providers/base-provider";
import { proxy } from "../../../lib/test-utils/proxy";
import { Contract } from "../../../lib/types";
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
  contractFile: "clarity/contracts/boot/bns.clar",
};
