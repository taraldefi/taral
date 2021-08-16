import { Transaction } from '../../../../shared/transaction';
import { ClarityTypes } from '../../../../shared/clarity/types';
import { IMetadata } from '../../../../shared/providers/types';

// prettier-ignore

export interface ArkadikoVaultRewardsV11Contract {
  addCollateral: (collateral: number, user: string, metadata: IMetadata) => Transaction<boolean, number>;
  claimPendingRewards: (metadata: IMetadata) => Transaction<number, number>;
  claimPendingRewardsLiquidatedVault: (user: string, metadata: IMetadata) => Transaction<number, number>;
  increaseCummRewardPerCollateral: (metadata: IMetadata) => Transaction<number, null>;
  removeCollateral: (collateral: number, user: string, metadata: IMetadata) => Transaction<boolean, number>;
  calculateCummRewardPerCollateral: (metadata: IMetadata) => Promise<number>;
  getCollateralAmountOf: (user: string, metadata: IMetadata) => Promise<number>;
  getCollateralOf: (user: string, metadata: IMetadata) => Promise<{
    "collateral": number;
  "cumm-reward-per-collateral": number
      }>;
  getCummRewardPerCollateralOf: (user: string, metadata: IMetadata) => Promise<number>;
  getPendingRewards: (user: string, metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
  ERRNOTAUTHORIZED: () => Promise<number>;
  ERRREWARDSCALC: () => Promise<number>;
  cummRewardPerCollateral: () => Promise<number>;
  lastRewardIncreaseBlock: () => Promise<number>;
  totalCollateral: () => Promise<number>;
  userCollateral: (key: {
    "user": string
      }) => Promise<{
    "collateral": number;
  "cumm-reward-per-collateral": number
      } | null>;
}
