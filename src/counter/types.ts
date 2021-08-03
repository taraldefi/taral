import { Transaction } from '../../shared/transaction';
import { ClarityTypes } from '../../shared/clarity/types';
import { IMetadata } from '../../shared/providers/types';

// prettier-ignore

export interface CounterContract {
  decrement: (metadata: IMetadata) => Transaction<number, number>;
  increment: (metadata: IMetadata) => Transaction<number, number>;
  getCounter: (metadata: IMetadata) => Promise<number>;
  decimals: () => Promise<number>;
  counter: () => Promise<number>;
}
