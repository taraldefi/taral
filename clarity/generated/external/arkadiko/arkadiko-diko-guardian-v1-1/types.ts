import { ClarityTypes } from "../../../../lib/clarity/types";
import { IMetadata } from "../../../../lib/providers/types";

// prettier-ignore

export interface ArkadikoDikoGuardianV11Contract {
    getStakingRewardsPerBlock: (metadata: IMetadata) => Promise<number>;
    getVaultRewardsPerBlock: (metadata: IMetadata) => Promise<number>;
    ERRNOTAUTHORIZED: () => Promise<ClarityTypes.Response<null, number>>;
    MINSTAKINGBLOCKREWARDS: () => Promise<number>;
    REWARDSPERBLOCKSTART: () => Promise<number>;
    STAKINGREWARDSFIRSTYEAR: () => Promise<number>;
    contractStartBlock: () => Promise<number>;
}
