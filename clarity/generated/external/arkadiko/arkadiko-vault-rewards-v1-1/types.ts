import { Transaction } from "../../../../lib/transaction";
import { ClarityTypes } from "../../../../lib/clarity/types";

// prettier-ignore

export interface ArkadikoVaultRewardsV11Contract {
  addCollateral: (collateral: number, user: string) => Transaction<boolean, number>;
  claimPendingRewards: () => Transaction<number, number>;
  claimPendingRewardsLiquidatedVault: (user: string) => Transaction<number, number>;
  increaseCummRewardPerCollateral: () => Transaction<number, null>;
  removeCollateral: (collateral: number, user: string) => Transaction<boolean, number>;
  calculateCummRewardPerCollateral: () => Promise<number>;
  getCollateralAmountOf: (user: string) => Promise<number>;
  getCollateralOf: (user: string) => Promise<{
    "collateral": number;
  "cumm-reward-per-collateral": number
      }>;
  getCummRewardPerCollateralOf: (user: string) => Promise<number>;
  getPendingRewards: (user: string) => Promise<ClarityTypes.Response<number, null>>;
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
