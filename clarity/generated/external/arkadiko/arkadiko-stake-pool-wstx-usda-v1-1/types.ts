import { Transaction } from "../../../../lib/transaction";
import { ClarityTypes } from "../../../../lib/clarity/types";

// prettier-ignore

export interface ArkadikoStakePoolWstxUsdaV11Contract {
  calculateCummRewardPerStake: (registryTrait: string) => Transaction<number, null>;
  claimPendingRewards: (registryTrait: string, staker: string) => Transaction<number, number>;
  emergencyWithdraw: (registryTrait: string) => Transaction<number, number>;
  getPendingRewards: (registryTrait: string, staker: string) => Transaction<number, null>;
  increaseCummRewardPerStake: (registryTrait: string) => Transaction<number, number>;
  stake: (registryTrait: string, token: string, staker: string, amount: number) => Transaction<number, number>;
  unstake: (registryTrait: string, token: string, staker: string, amount: number) => Transaction<number, number>;
  getCummRewardPerStake: () => Promise<number>;
  getLastRewardIncreaseBlock: () => Promise<number>;
  getStakeAmountOf: (staker: string) => Promise<number>;
  getStakeCummRewardPerStakeOf: (staker: string) => Promise<number>;
  getStakeOf: (staker: string) => Promise<{
    "cumm-reward-per-stake": number;
  "uamount": number
      }>;
  getTotalStaked: () => Promise<number>;
  ERRINSUFFICIENTSTAKE: () => Promise<ClarityTypes.Response<null, number>>;
  ERRNOTAUTHORIZED: () => Promise<ClarityTypes.Response<null, number>>;
  ERRREWARDSCALC: () => Promise<ClarityTypes.Response<null, number>>;
  ERRWRONGREGISTRY: () => Promise<ClarityTypes.Response<null, number>>;
  ERRWRONGTOKEN: () => Promise<ClarityTypes.Response<null, number>>;
  POOLTOKEN: () => Promise<string>;
  cummRewardPerStake: () => Promise<number>;
  lastRewardIncreaseBlock: () => Promise<number>;
  totalStaked: () => Promise<number>;
  stakes: (key: {
    "staker": string
      }) => Promise<{
    "cumm-reward-per-stake": number;
  "uamount": number
      } | null>;
}
