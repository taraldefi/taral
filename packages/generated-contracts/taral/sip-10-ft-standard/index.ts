import { BaseProvider, Contract, proxy } from "taral-shared";
import { Sip10FtStandardInterface } from "./abi";
import type { Sip10FtStandardContract } from "./types";
export type { Sip10FtStandardContract } from "./types";

export const sip10FtStandardContract = (provider: BaseProvider) => {
  const contract = proxy<Sip10FtStandardContract>(
    Sip10FtStandardInterface,
    provider
  );
  return contract;
};

export const sip10FtStandardInfo: Contract<Sip10FtStandardContract> = {
  contract: sip10FtStandardContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile:
    "C:\biz\taral/packages/clarity/contracts/taral/sip-10-ft-standard.clar",
};
