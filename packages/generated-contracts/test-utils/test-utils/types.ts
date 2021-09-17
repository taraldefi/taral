
  
  import { Transaction } from 'taral-shared';
  import { ClarityTypes } from 'taral-shared'

  export interface TestUtilsContract {
      mineBlock: () => Transaction<boolean, null>;
  getBlockHeight: () => Promise<bigint>;
  getStxBalance: (account: string) => Promise<bigint>;
  }