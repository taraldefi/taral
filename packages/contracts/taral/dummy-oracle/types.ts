
  
  import { Transaction } from 'lib-shared';
  import { ClarityTypes } from 'lib-shared'

  export interface DummyOracleContract {
      setBtcPrice: (newPrice: number | bigint) => Transaction<boolean, null>;
  setStxPrice: (newPrice: number | bigint) => Transaction<boolean, null>;
  getBtcPrice: () => Promise<ClarityTypes.Response<bigint, null>>;
  getStxPrice: () => Promise<ClarityTypes.Response<bigint, null>>;
  btcPrice: () => Promise<bigint>;
  stxPrice: () => Promise<bigint>;
  }