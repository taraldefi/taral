
  
  import { Transaction } from 'taral-shared';
  import { ClarityTypes } from 'taral-shared'

  export interface ArkadikoSwapV11Contract {
      addToPosition: (tokenXTrait: string, tokenYTrait: string, swapTokenTrait: string, x: number | bigint, y: number | bigint) => Transaction<boolean, bigint>;
  collectFees: (tokenXTrait: string, tokenYTrait: string) => Transaction<bigint[], bigint>;
  createPair: (tokenXTrait: string, tokenYTrait: string, swapTokenTrait: string, pairName: string, x: number | bigint, y: number | bigint) => Transaction<boolean, bigint>;
  getBalances: (tokenXTrait: string, tokenYTrait: string) => Transaction<bigint[], ClarityTypes.Response<null, bigint>>;
  getData: (tokenXTrait: string, tokenYTrait: string, swapTokenTrait: string, owner: string) => Transaction<{
  "balance": bigint;
  "balances": bigint[];
  "decimals": bigint;
  "name": string;
  "supply": bigint;
  "symbol": string;
  "uri": string | null
    }, null>;
  getPosition: (tokenXTrait: string, tokenYTrait: string, swapTokenTrait: string) => Transaction<bigint[], null>;
  getSymbol: (tokenXTrait: string, tokenYTrait: string) => Transaction<string, null>;
  reducePosition: (tokenXTrait: string, tokenYTrait: string, swapTokenTrait: string, percent: number | bigint) => Transaction<bigint[], bigint>;
  setFeeToAddress: (tokenX: string, tokenY: string, address: string) => Transaction<boolean, bigint>;
  swapXForY: (tokenXTrait: string, tokenYTrait: string, dx: number | bigint, minDy: number | bigint) => Transaction<bigint[], bigint>;
  swapYForX: (tokenXTrait: string, tokenYTrait: string, dy: number | bigint, minDx: number | bigint) => Transaction<bigint[], bigint>;
  getFeeToAddress: (tokenX: string, tokenY: string) => Promise<ClarityTypes.Response<string | null, ClarityTypes.Response<null, bigint>>>;
  getFees: (tokenX: string, tokenY: string) => Promise<ClarityTypes.Response<bigint[], ClarityTypes.Response<null, bigint>>>;
  getName: (tokenXTrait: string, tokenYTrait: string) => Promise<ClarityTypes.Response<string, ClarityTypes.Response<null, bigint>>>;
  getPairContracts: (pairId: number | bigint) => Promise<{
  "token-x": string;
  "token-y": string
    }>;
  getPairCount: () => Promise<ClarityTypes.Response<bigint, null>>;
  getPairDetails: (tokenX: string, tokenY: string) => Promise<ClarityTypes.Response<{
  "balance-x": bigint;
  "balance-y": bigint;
  "fee-balance-x": bigint;
  "fee-balance-y": bigint;
  "fee-to-address": string | null;
  "name": string;
  "shares-total": bigint;
  "swap-token": string
    } | null, ClarityTypes.Response<null, bigint>>>;
  getPairs: () => Promise<ClarityTypes.Response<{
  "token-x": string;
  "token-y": string
    }[], null>>;
  getShares: (tokenX: string, tokenY: string) => Promise<ClarityTypes.Response<bigint, ClarityTypes.Response<null, bigint>>>;
  getTotalSupply: (tokenXTrait: string, tokenYTrait: string) => Promise<ClarityTypes.Response<bigint, ClarityTypes.Response<null, bigint>>>;
  ERRINVALIDLIQUIDITY: () => Promise<bigint>;
  ERRNOFEETOADDRESS: () => Promise<bigint>;
  ERRNOTAUTHORIZED: () => Promise<bigint>;
  INVALIDPAIRERR: () => Promise<ClarityTypes.Response<null, bigint>>;
  balanceTooLowErr: () => Promise<ClarityTypes.Response<null, bigint>>;
  noFeeXErr: () => Promise<ClarityTypes.Response<null, bigint>>;
  noFeeYErr: () => Promise<ClarityTypes.Response<null, bigint>>;
  noLiquidityErr: () => Promise<ClarityTypes.Response<null, bigint>>;
  noSuchPositionErr: () => Promise<ClarityTypes.Response<null, bigint>>;
  notOwnerErr: () => Promise<ClarityTypes.Response<null, bigint>>;
  pairAlreadyExistsErr: () => Promise<ClarityTypes.Response<null, bigint>>;
  tooManyPairsErr: () => Promise<ClarityTypes.Response<null, bigint>>;
  tooMuchSlippageErr: () => Promise<ClarityTypes.Response<null, bigint>>;
  transferXFailedErr: () => Promise<ClarityTypes.Response<null, bigint>>;
  transferYFailedErr: () => Promise<ClarityTypes.Response<null, bigint>>;
  valueOutOfRangeErr: () => Promise<ClarityTypes.Response<null, bigint>>;
  wrongTokenErr: () => Promise<ClarityTypes.Response<null, bigint>>;
  pairCount: () => Promise<bigint>;
  pairsList: () => Promise<bigint[]>;
  pairsDataMap: (key: {
  "token-x": string;
  "token-y": string
    }) => Promise<{
  "balance-x": bigint;
  "balance-y": bigint;
  "fee-balance-x": bigint;
  "fee-balance-y": bigint;
  "fee-to-address": string | null;
  "name": string;
  "shares-total": bigint;
  "swap-token": string
    } | null>;
  pairsMap: (key: {
  "pair-id": bigint
    }) => Promise<{
  "token-x": string;
  "token-y": string
    } | null>;
  }