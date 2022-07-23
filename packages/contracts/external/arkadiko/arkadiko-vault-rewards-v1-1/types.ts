import { ClarityTypes, Transaction } from "lib-shared";

export interface ArkadikoVaultRewardsV11Contract {
    addCollateral: (
        collateral: number | bigint,
        user: string
    ) => Transaction<boolean, bigint>;
    claimPendingRewards: () => Transaction<bigint, bigint>;
    claimPendingRewardsLiquidatedVault: (
        user: string
    ) => Transaction<bigint, bigint>;
    increaseCummRewardPerCollateral: () => Transaction<bigint, null>;
    removeCollateral: (
        collateral: number | bigint,
        user: string
    ) => Transaction<boolean, bigint>;
    calculateCummRewardPerCollateral: () => Promise<bigint>;
    getCollateralAmountOf: (user: string) => Promise<bigint>;
    getCollateralOf: (user: string) => Promise<{
        collateral: bigint;
        "cumm-reward-per-collateral": bigint;
    }>;
    getCummRewardPerCollateralOf: (user: string) => Promise<bigint>;
    getPendingRewards: (
        user: string
    ) => Promise<ClarityTypes.Response<bigint, null>>;
    ERRNOTAUTHORIZED: () => Promise<bigint>;
    ERRREWARDSCALC: () => Promise<bigint>;
    cummRewardPerCollateral: () => Promise<bigint>;
    lastRewardIncreaseBlock: () => Promise<bigint>;
    totalCollateral: () => Promise<bigint>;
    userCollateral: (key: { user: string }) => Promise<{
        collateral: bigint;
        "cumm-reward-per-collateral": bigint;
    } | null>;
}
