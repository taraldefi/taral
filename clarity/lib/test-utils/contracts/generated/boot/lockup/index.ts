import { BaseProvider } from "../../../../../providers/base-provider";
import { proxy } from "../../../../proxy";
import { Contract } from "../../../../../types";
import { LockupInterface } from "./abi";
import type { LockupContract } from "./types";

export type { LockupContract } from "./types";

export const lockupContract = (provider: BaseProvider) => {
  const contract = proxy<LockupContract>(LockupInterface, provider);
  return contract;
};

export const lockupInfo: Contract<LockupContract> = {
  contract: lockupContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "clarity/lib/test-utils/contracts/boot/lockup.clar",
};
