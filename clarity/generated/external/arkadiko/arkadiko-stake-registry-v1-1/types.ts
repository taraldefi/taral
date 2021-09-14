import { Transaction } from '../../../../lib/transaction';
import { ClarityTypes } from '../../../../lib/clarity/types';

// prettier-ignore

export interface ArkadikoStakeRegistryV11Contract {
  claimPendingRewards: (registryTrait: string, poolTrait: string) => Transaction<number, number>;
  getPendingRewards: (registryTrait: string, poolTrait: string) => Transaction<number, number>;
  stake: (registryTrait: string, poolTrait: string, tokenTrait: string, amount: number) => Transaction<number, number>;
  stakePendingRewards: (registryTrait: string, poolTrait: string, dikoPoolTrait: string, dikoTokenTrait: string) => Transaction<number, number>;
  unstake: (registryTrait: string, poolTrait: string, tokenTrait: string, amount: number) => Transaction<number, number>;
  getPoolData: (pool: string) => Promise<{
    "deactivated-block": number;
  "deactivated-rewards-per-block": number;
  "name": string;
  "rewards-percentage": number
      }>;
  getPoolDeactivatedBlock: (pool: string) => Promise<ClarityTypes.Response<number, number>>;
  getRewardsPerBlockForPool: (pool: string) => Promise<ClarityTypes.Response<number, null>>;
  ERRINVALIDPOOL: () => Promise<ClarityTypes.Response<null, number>>;
  ERRPOOLEXIST: () => Promise<ClarityTypes.Response<null, number>>;
  ERRPOOLINACTIVE: () => Promise<ClarityTypes.Response<null, number>>;
  ERRWRONGREGISTRY: () => Promise<ClarityTypes.Response<null, number>>;
  poolCount: () => Promise<number>;
  poolsDataMap: (key: {
    "pool": string
      }) => Promise<{
    "deactivated-block": number;
  "deactivated-rewards-per-block": number;
  "name": string;
  "rewards-percentage": number
      } | null>;
}
