
  
  import { Transaction } from 'taral-shared';
  import { ClarityTypes } from 'taral-shared'

  export interface LockupContract {
      getLockups: (stxBlockHeightOpt: bigint | null) => Promise<ClarityTypes.Response<{
  "amount": bigint;
  "recipient": string
    }[], null>>;
  lockups: (key: bigint) => Promise<{
  "amount": bigint;
  "recipient": string
    }[] | null>;
  }