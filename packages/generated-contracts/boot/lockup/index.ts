import { BaseProvider, Contract, proxy } from "lib-shared";
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
  contractFile: "packages/clarity/contracts/boot/lockup.clar",
};
