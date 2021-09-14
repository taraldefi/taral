import { Transaction } from "../../../../lib/transaction";
import { ClarityTypes } from "../../../../lib/clarity/types";

// prettier-ignore

export interface WrappedStxTokenContract {
  burnForDao: (amount: number, sender: string) => Transaction<boolean, number>;
  mintForDao: (amount: number, recipient: string) => Transaction<boolean, number>;
  setTokenUri: (value: string) => Transaction<boolean, number>;
  transfer: (amount: number, sender: string, recipient: string, memo: Buffer | null) => Transaction<boolean, number>;
  getBalance: (account: string) => Promise<ClarityTypes.Response<number, null>>;
  getDecimals: () => Promise<ClarityTypes.Response<number, null>>;
  getName: () => Promise<ClarityTypes.Response<string, null>>;
  getSymbol: () => Promise<ClarityTypes.Response<string, null>>;
  getTokenUri: () => Promise<ClarityTypes.Response<string | null, null>>;
  getTotalSupply: () => Promise<ClarityTypes.Response<number, null>>;
  ERRNOTAUTHORIZED: () => Promise<number>;
  tokenUri: () => Promise<string>;
}
