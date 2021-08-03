import { Transaction } from '../../shared/transaction';
import { ClarityTypes } from '../../shared/clarity/types';
import { IMetadata } from '../../shared/providers/types';

// prettier-ignore

export interface ArkadikoSwapTokenWstxUsdaContract {
  burn: (recipient: string, amount: number, metadata: IMetadata) => Transaction<boolean, number>;
  mint: (recipient: string, amount: number, metadata: IMetadata) => Transaction<boolean, number>;
  transfer: (amount: number, sender: string, recipient: string, memo: Buffer | null, metadata: IMetadata) => Transaction<boolean, number>;
  getBalance: (owner: string, metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
  getData: (owner: string, metadata: IMetadata) => Promise<ClarityTypes.Response<{
    "balance": number;
  "decimals": number;
  "name": string;
  "supply": number;
  "symbol": string;
  "uri": string | null
      }, null>>;
  getDecimals: (metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
  getName: (metadata: IMetadata) => Promise<ClarityTypes.Response<string, null>>;
  getSymbol: (metadata: IMetadata) => Promise<ClarityTypes.Response<string, null>>;
  getTokenUri: (metadata: IMetadata) => Promise<ClarityTypes.Response<string | null, null>>;
  getTotalSupply: (metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
  ERRNOTAUTHORIZED: () => Promise<number>;
}
