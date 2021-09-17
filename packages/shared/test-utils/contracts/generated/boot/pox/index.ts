import { BaseProvider } from "../../../../../providers/base-provider";
import { proxy } from "../../../../../test-utils/proxy";
import { Contract } from "../../../../../types";
import { PoxInterface } from "./abi";
import type { PoxContract } from "./types";
export type { PoxContract } from "./types";

export const poxContract = (provider: BaseProvider) => {
  const contract = proxy<PoxContract>(PoxInterface, provider);
  return contract;
};

export const poxInfo: Contract<PoxContract> = {
  contract: poxContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "clarity/lib/test-utils/contracts/boot/pox.clar",
};
