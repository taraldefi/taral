import { Transaction } from '../../../../lib/transaction';
import { ClarityTypes } from '../../../../lib/clarity/types';

// prettier-ignore

export interface ArkadikoSwapV11Contract {
  addToPosition: (tokenXTrait: string, tokenYTrait: string, swapTokenTrait: string, x: number, y: number) => Transaction<boolean, number>;
  collectFees: (tokenXTrait: string, tokenYTrait: string) => Transaction<number[], number>;
  createPair: (tokenXTrait: string, tokenYTrait: string, swapTokenTrait: string, pairName: string, x: number, y: number) => Transaction<boolean, number>;
  getBalances: (tokenXTrait: string, tokenYTrait: string) => Transaction<number[], ClarityTypes.Response<null, number>>;
  getData: (tokenXTrait: string, tokenYTrait: string, swapTokenTrait: string, owner: string) => Transaction<{
    "balance": number;
  "balances": number[];
  "decimals": number;
  "name": string;
  "supply": number;
  "symbol": string;
  "uri": string | null
      }, null>;
  getPosition: (tokenXTrait: string, tokenYTrait: string, swapTokenTrait: string) => Transaction<number[], null>;
  getSymbol: (tokenXTrait: string, tokenYTrait: string) => Transaction<string, null>;
  reducePosition: (tokenXTrait: string, tokenYTrait: string, swapTokenTrait: string, percent: number) => Transaction<number[], number>;
  setFeeToAddress: (tokenX: string, tokenY: string, address: string) => Transaction<boolean, number>;
  swapXForY: (tokenXTrait: string, tokenYTrait: string, dx: number, minDy: number) => Transaction<number[], number>;
  swapYForX: (tokenXTrait: string, tokenYTrait: string, dy: number, minDx: number) => Transaction<number[], number>;
  getFeeToAddress: (tokenX: string, tokenY: string) => Promise<ClarityTypes.Response<string | null, ClarityTypes.Response<null, number>>>;
  getFees: (tokenX: string, tokenY: string) => Promise<ClarityTypes.Response<number[], ClarityTypes.Response<null, number>>>;
  getName: (tokenXTrait: string, tokenYTrait: string) => Promise<ClarityTypes.Response<string, ClarityTypes.Response<null, number>>>;
  getPairContracts: (pairId: number) => Promise<{
    "token-x": string;
  "token-y": string
      }>;
  getPairCount: () => Promise<ClarityTypes.Response<number, null>>;
  getPairDetails: (tokenX: string, tokenY: string) => Promise<ClarityTypes.Response<{
    "balance-x": number;
  "balance-y": number;
  "fee-balance-x": number;
  "fee-balance-y": number;
  "fee-to-address": string | null;
  "name": string;
  "shares-total": number;
  "swap-token": string
      } | null, ClarityTypes.Response<null, number>>>;
  getPairs: () => Promise<ClarityTypes.Response<{
    "token-x": string;
  "token-y": string
      }[], null>>;
  getShares: (tokenX: string, tokenY: string) => Promise<ClarityTypes.Response<number, ClarityTypes.Response<null, number>>>;
  getTotalSupply: (tokenXTrait: string, tokenYTrait: string) => Promise<ClarityTypes.Response<number, ClarityTypes.Response<null, number>>>;
  ERRINVALIDLIQUIDITY: () => Promise<number>;
  ERRNOFEETOADDRESS: () => Promise<number>;
  ERRNOTAUTHORIZED: () => Promise<number>;
  INVALIDPAIRERR: () => Promise<ClarityTypes.Response<null, number>>;
  balanceTooLowErr: () => Promise<ClarityTypes.Response<null, number>>;
  noFeeXErr: () => Promise<ClarityTypes.Response<null, number>>;
  noFeeYErr: () => Promise<ClarityTypes.Response<null, number>>;
  noLiquidityErr: () => Promise<ClarityTypes.Response<null, number>>;
  noSuchPositionErr: () => Promise<ClarityTypes.Response<null, number>>;
  notOwnerErr: () => Promise<ClarityTypes.Response<null, number>>;
  pairAlreadyExistsErr: () => Promise<ClarityTypes.Response<null, number>>;
  tooManyPairsErr: () => Promise<ClarityTypes.Response<null, number>>;
  tooMuchSlippageErr: () => Promise<ClarityTypes.Response<null, number>>;
  transferXFailedErr: () => Promise<ClarityTypes.Response<null, number>>;
  transferYFailedErr: () => Promise<ClarityTypes.Response<null, number>>;
  valueOutOfRangeErr: () => Promise<ClarityTypes.Response<null, number>>;
  wrongTokenErr: () => Promise<ClarityTypes.Response<null, number>>;
  pairCount: () => Promise<number>;
  pairsList: () => Promise<number[]>;
  pairsDataMap: (key: {
    "token-x": string;
  "token-y": string
      }) => Promise<{
    "balance-x": number;
  "balance-y": number;
  "fee-balance-x": number;
  "fee-balance-y": number;
  "fee-to-address": string | null;
  "name": string;
  "shares-total": number;
  "swap-token": string
      } | null>;
  pairsMap: (key: {
    "pair-id": number
      }) => Promise<{
    "token-x": string;
  "token-y": string
      } | null>;
}
