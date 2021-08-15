import { ClarityTypes } from '../../../shared/clarity/types';
import { IMetadata } from '../../../shared/providers/types';
import { Transaction } from '../../../shared/transaction';

// prettier-ignore

export interface TaralCoinContract {
    getTokenUri: (metadata: IMetadata) => Transaction<string | null, null>;
    mint: (recipient: string, amount: number, metadata: IMetadata) => Transaction<boolean, number>;
    transfer: (amount: number, sender: string, recipient: string, memo: Buffer | null, metadata: IMetadata) => Transaction<boolean, number>;
    getBalance: (owner: string, metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
    getDecimals: (metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
    getName: (metadata: IMetadata) => Promise<ClarityTypes.Response<string, null>>;
    getSymbol: (metadata: IMetadata) => Promise<ClarityTypes.Response<string, null>>;
    getTotalSupply: (metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
}
