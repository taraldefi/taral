import { Transaction } from "lib-shared";
import { ClarityTypes } from "lib-shared";

export interface Sip010TokenContract {
  mint: (
    amount: number | bigint,
    recipient: string
  ) => Transaction<boolean, bigint>;
  transfer: (
    amount: number | bigint,
    sender: string,
    recipient: string,
    memo: Buffer | null
  ) => Transaction<boolean, bigint>;
  getBalance: (who: string) => Promise<ClarityTypes.Response<bigint, null>>;
  getDecimals: () => Promise<ClarityTypes.Response<bigint, null>>;
  getName: () => Promise<ClarityTypes.Response<string, null>>;
  getSymbol: () => Promise<ClarityTypes.Response<string, null>>;
  getTokenUri: () => Promise<ClarityTypes.Response<null | null, null>>;
  getTotalSupply: () => Promise<ClarityTypes.Response<bigint, null>>;
  contractOwner: () => Promise<string>;
  errNotTokenOwner: () => Promise<ClarityTypes.Response<null, bigint>>;
  errOwnerOnly: () => Promise<ClarityTypes.Response<null, bigint>>;
}
