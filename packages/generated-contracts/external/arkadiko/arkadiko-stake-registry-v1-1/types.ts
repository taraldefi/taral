
  
  import { Transaction } from 'lib-shared';
  import { ClarityTypes } from 'lib-shared'

  export interface ArkadikoStakeRegistryV11Contract {
      claimPendingRewards: (registryTrait: string, poolTrait: string) => Transaction<bigint, bigint>;
  getPendingRewards: (registryTrait: string, poolTrait: string) => Transaction<bigint, bigint>;
  stake: (registryTrait: string, poolTrait: string, tokenTrait: string, amount: number | bigint) => Transaction<bigint, bigint>;
  stakePendingRewards: (registryTrait: string, poolTrait: string, dikoPoolTrait: string, dikoTokenTrait: string) => Transaction<bigint, bigint>;
  unstake: (registryTrait: string, poolTrait: string, tokenTrait: string, amount: number | bigint) => Transaction<bigint, bigint>;
  getPoolData: (pool: string) => Promise<{
  "deactivated-block": bigint;
  "deactivated-rewards-per-block": bigint;
  "name": string;
  "rewards-percentage": bigint
    }>;
  getPoolDeactivatedBlock: (pool: string) => Promise<ClarityTypes.Response<bigint, bigint>>;
  getRewardsPerBlockForPool: (pool: string) => Promise<ClarityTypes.Response<bigint, null>>;
  ERRINVALIDPOOL: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERRPOOLEXIST: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERRPOOLINACTIVE: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERRWRONGREGISTRY: () => Promise<ClarityTypes.Response<null, bigint>>;
  poolCount: () => Promise<bigint>;
  poolsDataMap: (key: {
  "pool": string
    }) => Promise<{
  "deactivated-block": bigint;
  "deactivated-rewards-per-block": bigint;
  "name": string;
  "rewards-percentage": bigint
    } | null>;
  }