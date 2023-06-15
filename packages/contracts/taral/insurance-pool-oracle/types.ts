
  
  import { Transaction } from 'lib-shared';
  import { ClarityTypes } from 'lib-shared'

  export interface InsurancePoolOracleContract {
      getPrice: (source: string, symbol: string) => Promise<{
  "amount": bigint;
  "height": bigint;
  "timestamp": bigint
    } | null>;
  }