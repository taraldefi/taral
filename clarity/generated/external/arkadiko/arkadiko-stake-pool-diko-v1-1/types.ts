import { Transaction } from "../../../../lib/transaction";
import { ClarityTypes } from "../../../../lib/clarity/types";

// prettier-ignore

export interface ArkadikoStakePoolDikoV11Contract {
  addRewardsToPool: (registryTrait: string) => Transaction<number, number>;
  claimPendingRewards: (registryTrait: string, staker: string) => Transaction<number, null>;
  dikoForStdiko: (registryTrait: string, amount: number, stdikoSupply: number) => Transaction<number, null>;
  executeSlash: (percentage: number) => Transaction<number, number>;
  getPendingRewards: (registryTrait: string, staker: string) => Transaction<number, null>;
  getStakeOf: (registryTrait: string, staker: string, stdikoSupply: number) => Transaction<number, null>;
  stake: (registryTrait: string, token: string, staker: string, amount: number) => Transaction<number, number>;
  startCooldown: () => Transaction<number, null>;
  unstake: (registryTrait: string, token: string, staker: string, amount: number) => Transaction<number, number>;
  dikoStdikoRatio: () => Promise<ClarityTypes.Response<number, null>>;
  getCooldownInfoOf: (wallet: string) => Promise<{
    "redeem-period-end-block": number;
  "redeem-period-start-block": number
      }>;
  getLastRewardAddBlock: () => Promise<number>;
  getTotalStaked: () => Promise<number>;
  walletCanRedeem: (wallet: string) => Promise<boolean>;
  ERRCOOLDOWNNOTENDED: () => Promise<ClarityTypes.Response<null, number>>;
  ERRNOTAUTHORIZED: () => Promise<ClarityTypes.Response<null, number>>;
  ERRREWARDSCALC: () => Promise<ClarityTypes.Response<null, number>>;
  ERRWRONGREGISTRY: () => Promise<ClarityTypes.Response<null, number>>;
  ERRWRONGTOKEN: () => Promise<ClarityTypes.Response<null, number>>;
  POOLTOKEN: () => Promise<string>;
  lastRewardAddBlock: () => Promise<number>;
  walletCooldown: (key: {
    "wallet": string
      }) => Promise<{
    "redeem-period-end-block": number;
  "redeem-period-start-block": number
      } | null>;
}
