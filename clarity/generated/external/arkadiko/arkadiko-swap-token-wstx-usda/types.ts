import { Transaction } from '../../../../lib/transaction';
import { ClarityTypes } from '../../../../lib/clarity/types';

// prettier-ignore

export interface ArkadikoSwapTokenWstxUsdaContract {
  burn: (recipient: string, amount: number) => Transaction<boolean, number>;
  mint: (recipient: string, amount: number) => Transaction<boolean, number>;
  transfer: (amount: number, sender: string, recipient: string, memo: Buffer | null) => Transaction<boolean, number>;
  getBalance: (owner: string) => Promise<ClarityTypes.Response<number, null>>;
  getData: (owner: string) => Promise<ClarityTypes.Response<{
    "balance": number;
  "decimals": number;
  "name": string;
  "supply": number;
  "symbol": string;
  "uri": string | null
      }, null>>;
  getDecimals: () => Promise<ClarityTypes.Response<number, null>>;
  getName: () => Promise<ClarityTypes.Response<string, null>>;
  getSymbol: () => Promise<ClarityTypes.Response<string, null>>;
  getTokenUri: () => Promise<ClarityTypes.Response<string | null, null>>;
  getTotalSupply: () => Promise<ClarityTypes.Response<number, null>>;
  ERRNOTAUTHORIZED: () => Promise<number>;
}
