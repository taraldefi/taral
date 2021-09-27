import { BaseProvider, Contract, proxy } from "lib-shared";
import { StdikoTokenInterface } from "./abi";
import type { StdikoTokenContract } from "./types";
export type { StdikoTokenContract } from "./types";

export const stdikoTokenContract = (provider: BaseProvider) => {
  const contract = proxy<StdikoTokenContract>(StdikoTokenInterface, provider);
  return contract;
};

export const stdikoTokenInfo: Contract<StdikoTokenContract> = {
  contract: stdikoTokenContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile:
    "packages/clarity/contracts/external/arkadiko/stdiko-token.clar",
};
