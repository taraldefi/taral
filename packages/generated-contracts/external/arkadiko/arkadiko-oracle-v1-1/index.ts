import { BaseProvider, Contract, proxy } from "taral-shared";
import { ArkadikoOracleV11Interface } from "./abi";
import type { ArkadikoOracleV11Contract } from "./types";
export type { ArkadikoOracleV11Contract } from "./types";

export const arkadikoOracleV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoOracleV11Contract>(
    ArkadikoOracleV11Interface,
    provider
  );
  return contract;
};

export const arkadikoOracleV11Info: Contract<ArkadikoOracleV11Contract> = {
  contract: arkadikoOracleV11Contract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile:
    "C:\biz\taral/packages/clarity/contracts/external/arkadiko/arkadiko-oracle-v1-1.clar",
};
