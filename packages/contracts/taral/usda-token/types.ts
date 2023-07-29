import { Transaction } from "lib-shared";
import { ClarityTypes } from "lib-shared";

export interface UsdaTokenContract {
  setTokenUri: (value: string) => Transaction<boolean, null>;
  transfer: (
    amount: number | bigint,
    sender: string,
    recipient: string,
    memo: Buffer | null
  ) => Transaction<boolean, bigint>;
  getBalance: (account: string) => Promise<ClarityTypes.Response<bigint, null>>;
  getDecimals: () => Promise<ClarityTypes.Response<bigint, null>>;
  getName: () => Promise<ClarityTypes.Response<string, null>>;
  getSymbol: () => Promise<ClarityTypes.Response<string, null>>;
  getTokenUri: () => Promise<ClarityTypes.Response<string | null, null>>;
  getTotalSupply: () => Promise<ClarityTypes.Response<bigint, null>>;
  ERRNOTAUTHORIZED: () => Promise<bigint>;
  tokenUri: () => Promise<string>;
}
