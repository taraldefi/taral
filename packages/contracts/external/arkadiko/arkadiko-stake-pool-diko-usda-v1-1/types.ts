import { ClarityTypes, Transaction } from "lib-shared";

export interface ArkadikoStakePoolDikoUsdaV11Contract {
    calculateCummRewardPerStake: (
        registryTrait: string
    ) => Transaction<bigint, null>;
    claimPendingRewards: (
        registryTrait: string,
        staker: string
    ) => Transaction<bigint, bigint>;
    emergencyWithdraw: (registryTrait: string) => Transaction<bigint, bigint>;
    getPendingRewards: (
        registryTrait: string,
        staker: string
    ) => Transaction<bigint, null>;
    increaseCummRewardPerStake: (
        registryTrait: string
    ) => Transaction<bigint, bigint>;
    stake: (
        registryTrait: string,
        token: string,
        staker: string,
        amount: number | bigint
    ) => Transaction<bigint, bigint>;
    unstake: (
        registryTrait: string,
        token: string,
        staker: string,
        amount: number | bigint
    ) => Transaction<bigint, bigint>;
    getCummRewardPerStake: () => Promise<bigint>;
    getLastRewardIncreaseBlock: () => Promise<bigint>;
    getStakeAmountOf: (staker: string) => Promise<bigint>;
    getStakeCummRewardPerStakeOf: (staker: string) => Promise<bigint>;
    getStakeOf: (staker: string) => Promise<{
        "cumm-reward-per-stake": bigint;
        uamount: bigint;
    }>;
    getTotalStaked: () => Promise<bigint>;
    ERRINSUFFICIENTSTAKE: () => Promise<ClarityTypes.Response<null, bigint>>;
    ERRNOTAUTHORIZED: () => Promise<ClarityTypes.Response<null, bigint>>;
    ERRREWARDSCALC: () => Promise<ClarityTypes.Response<null, bigint>>;
    ERRWRONGREGISTRY: () => Promise<ClarityTypes.Response<null, bigint>>;
    ERRWRONGTOKEN: () => Promise<ClarityTypes.Response<null, bigint>>;
    POOLTOKEN: () => Promise<string>;
    cummRewardPerStake: () => Promise<bigint>;
    lastRewardIncreaseBlock: () => Promise<bigint>;
    totalStaked: () => Promise<bigint>;
    stakes: (key: { staker: string }) => Promise<{
        "cumm-reward-per-stake": bigint;
        uamount: bigint;
    } | null>;
}
