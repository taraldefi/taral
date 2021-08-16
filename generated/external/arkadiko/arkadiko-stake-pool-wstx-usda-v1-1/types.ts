import { Transaction } from '../../../../shared/transaction';
import { ClarityTypes } from '../../../../shared/clarity/types';
import { IMetadata } from '../../../../shared/providers/types';

// prettier-ignore

export interface ArkadikoStakePoolWstxUsdaV11Contract {
  calculateCummRewardPerStake: (registryTrait: string, metadata: IMetadata) => Transaction<number, null>;
  claimPendingRewards: (registryTrait: string, staker: string, metadata: IMetadata) => Transaction<number, number>;
  emergencyWithdraw: (registryTrait: string, metadata: IMetadata) => Transaction<number, number>;
  getPendingRewards: (registryTrait: string, staker: string, metadata: IMetadata) => Transaction<number, null>;
  increaseCummRewardPerStake: (registryTrait: string, metadata: IMetadata) => Transaction<number, number>;
  stake: (registryTrait: string, token: string, staker: string, amount: number, metadata: IMetadata) => Transaction<number, number>;
  unstake: (registryTrait: string, token: string, staker: string, amount: number, metadata: IMetadata) => Transaction<number, number>;
  getCummRewardPerStake: (metadata: IMetadata) => Promise<number>;
  getLastRewardIncreaseBlock: (metadata: IMetadata) => Promise<number>;
  getStakeAmountOf: (staker: string, metadata: IMetadata) => Promise<number>;
  getStakeCummRewardPerStakeOf: (staker: string, metadata: IMetadata) => Promise<number>;
  getStakeOf: (staker: string, metadata: IMetadata) => Promise<{
    "cumm-reward-per-stake": number;
  "uamount": number
      }>;
  getTotalStaked: (metadata: IMetadata) => Promise<number>;
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
