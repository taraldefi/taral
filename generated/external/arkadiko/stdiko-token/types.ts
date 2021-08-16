import { Transaction } from '../../../../shared/transaction';
import { ClarityTypes } from '../../../../shared/clarity/types';
import { IMetadata } from '../../../../shared/providers/types';

// prettier-ignore

export interface StdikoTokenContract {
  burnForDao: (amount: number, sender: string, metadata: IMetadata) => Transaction<boolean, number>;
  mintForDao: (amount: number, recipient: string, metadata: IMetadata) => Transaction<boolean, number>;
  setTokenUri: (value: string, metadata: IMetadata) => Transaction<boolean, number>;
  transfer: (amount: number, sender: string, recipient: string, memo: Buffer | null, metadata: IMetadata) => Transaction<boolean, number>;
  getBalance: (account: string, metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
  getDecimals: (metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
  getName: (metadata: IMetadata) => Promise<ClarityTypes.Response<string, null>>;
  getSymbol: (metadata: IMetadata) => Promise<ClarityTypes.Response<string, null>>;
  getTokenUri: (metadata: IMetadata) => Promise<ClarityTypes.Response<string | null, null>>;
  getTotalSupply: (metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
  ERRNOTAUTHORIZED: () => Promise<number>;
  tokenUri: () => Promise<string>;
}
