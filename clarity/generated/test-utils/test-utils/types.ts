import { Transaction } from '../../../lib/transaction';
import { ClarityTypes } from '../../../lib/clarity/types';
import { IMetadata } from '../../../lib/providers/types';

// prettier-ignore

export interface TestUtilsContract {
  mineBlock: (metadata: IMetadata) => Transaction<boolean, null>;
  getBlockHeight: (metadata: IMetadata) => Promise<number>;
}
