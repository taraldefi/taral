import { Transaction } from '../../../lib/transaction';
import { ClarityTypes } from '../../../lib/clarity/types';

// prettier-ignore

export interface TaralCoinContract {
  getTokenUri: () => Transaction<string | null, null>;
  mint: (recipient: string, amount: number | bigint) => Transaction<boolean, bigint>;
  transfer: (amount: number | bigint, sender: string, recipient: string, memo: Buffer | null) => Transaction<boolean, bigint>;
  getBalance: (owner: string) => Promise<ClarityTypes.Response<bigint, null>>;
  getDecimals: () => Promise<ClarityTypes.Response<bigint, null>>;
  getName: () => Promise<ClarityTypes.Response<string, null>>;
  getSymbol: () => Promise<ClarityTypes.Response<string, null>>;
  getTotalSupply: () => Promise<ClarityTypes.Response<bigint, null>>;
}
