import { BaseProvider, Contract, proxy } from "lib-shared";
import { ClarityBitcoinInterface } from "./abi";
import type { ClarityBitcoinContract } from "./types";
export type { ClarityBitcoinContract } from "./types";

export const clarityBitcoinContract = (provider: BaseProvider) => {
  const contract = proxy<ClarityBitcoinContract>(
    ClarityBitcoinInterface,
    provider
  );
  return contract;
};

export const clarityBitcoinInfo: Contract<ClarityBitcoinContract> = {
  contract: clarityBitcoinContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/clarity-bitcoin.clar",
};
