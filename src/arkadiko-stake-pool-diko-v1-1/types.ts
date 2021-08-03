import { Transaction } from '../../shared/transaction';
import { ClarityTypes } from '../../shared/clarity/types';
import { IMetadata } from '../../shared/providers/types';

// prettier-ignore

export interface ArkadikoStakePoolDikoV11Contract {
  addRewardsToPool: (registryTrait: string, metadata: IMetadata) => Transaction<number, number>;
  claimPendingRewards: (registryTrait: string, staker: string, metadata: IMetadata) => Transaction<number, null>;
  dikoForStdiko: (registryTrait: string, amount: number, stdikoSupply: number, metadata: IMetadata) => Transaction<number, null>;
  executeSlash: (percentage: number, metadata: IMetadata) => Transaction<number, number>;
  getPendingRewards: (registryTrait: string, staker: string, metadata: IMetadata) => Transaction<number, null>;
  getStakeOf: (registryTrait: string, staker: string, stdikoSupply: number, metadata: IMetadata) => Transaction<number, null>;
  stake: (registryTrait: string, token: string, staker: string, amount: number, metadata: IMetadata) => Transaction<number, number>;
  unstake: (registryTrait: string, token: string, staker: string, amount: number, metadata: IMetadata) => Transaction<number, number>;
  dikoStdikoRatio: (metadata: IMetadata) => Promise<number>;
  getLastRewardAddBlock: (metadata: IMetadata) => Promise<number>;
  getTotalStaked: (metadata: IMetadata) => Promise<number>;
  ERRNOTAUTHORIZED: () => Promise<ClarityTypes.Response<null, number>>;
  ERRREWARDSCALC: () => Promise<ClarityTypes.Response<null, number>>;
  ERRWRONGREGISTRY: () => Promise<ClarityTypes.Response<null, number>>;
  ERRWRONGTOKEN: () => Promise<ClarityTypes.Response<null, number>>;
  POOLTOKEN: () => Promise<string>;
  lastRewardAddBlock: () => Promise<number>;
}
