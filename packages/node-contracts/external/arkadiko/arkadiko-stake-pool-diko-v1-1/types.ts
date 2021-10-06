import { ClarityTypes, Transaction } from "lib-shared";

export interface ArkadikoStakePoolDikoV11Contract {
  addRewardsToPool: (registryTrait: string) => Transaction<bigint, bigint>;
  claimPendingRewards: (
    registryTrait: string,
    staker: string
  ) => Transaction<bigint, null>;
  dikoForStdiko: (
    registryTrait: string,
    amount: number | bigint,
    stdikoSupply: number | bigint
  ) => Transaction<bigint, null>;
  executeSlash: (percentage: number | bigint) => Transaction<bigint, bigint>;
  getPendingRewards: (
    registryTrait: string,
    staker: string
  ) => Transaction<bigint, null>;
  getStakeOf: (
    registryTrait: string,
    staker: string,
    stdikoSupply: number | bigint
  ) => Transaction<bigint, null>;
  stake: (
    registryTrait: string,
    token: string,
    staker: string,
    amount: number | bigint
  ) => Transaction<bigint, bigint>;
  startCooldown: () => Transaction<bigint, null>;
  unstake: (
    registryTrait: string,
    token: string,
    staker: string,
    amount: number | bigint
  ) => Transaction<bigint, bigint>;
  dikoStdikoRatio: () => Promise<ClarityTypes.Response<bigint, null>>;
  getCooldownInfoOf: (wallet: string) => Promise<{
    "redeem-period-end-block": bigint;
    "redeem-period-start-block": bigint;
  }>;
  getLastRewardAddBlock: () => Promise<bigint>;
  getTotalStaked: () => Promise<bigint>;
  walletCanRedeem: (wallet: string) => Promise<boolean>;
  ERRCOOLDOWNNOTENDED: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERRNOTAUTHORIZED: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERRREWARDSCALC: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERRWRONGREGISTRY: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERRWRONGTOKEN: () => Promise<ClarityTypes.Response<null, bigint>>;
  POOLTOKEN: () => Promise<string>;
  lastRewardAddBlock: () => Promise<bigint>;
  walletCooldown: (key: { wallet: string }) => Promise<{
    "redeem-period-end-block": bigint;
    "redeem-period-start-block": bigint;
  } | null>;
}
