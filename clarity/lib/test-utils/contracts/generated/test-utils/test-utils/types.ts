import { Transaction } from '../../../../../transaction';
import { ClarityTypes } from '../../../../../types';

// prettier-ignore

export interface TestUtilsContract {
  mineBlock: () => Transaction<boolean, null>;
  getBlockHeight: () => Promise<bigint>;
}
