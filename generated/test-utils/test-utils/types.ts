import { Transaction } from '../../../shared/transaction';
import { ClarityTypes } from '../../../shared/clarity/types';
import { IMetadata } from '../../../shared/providers/types';

// prettier-ignore

export interface TestUtilsContract {
  mineBlock: (metadata: IMetadata) => Transaction<boolean, null>;
  getBlockHeight: (metadata: IMetadata) => Promise<number>;
}
