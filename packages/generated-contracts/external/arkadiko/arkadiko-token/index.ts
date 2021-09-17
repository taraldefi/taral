import { BaseProvider, Contract, proxy } from "taral-shared";
import { ArkadikoTokenInterface } from "./abi";
import type { ArkadikoTokenContract } from "./types";
export type { ArkadikoTokenContract } from "./types";

export const arkadikoTokenContract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoTokenContract>(
    ArkadikoTokenInterface,
    provider
  );
  return contract;
};

export const arkadikoTokenInfo: Contract<ArkadikoTokenContract> = {
  contract: arkadikoTokenContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile:
    "C:\biz\taral/packages/clarity/contracts/external/arkadiko/arkadiko-token.clar",
};
