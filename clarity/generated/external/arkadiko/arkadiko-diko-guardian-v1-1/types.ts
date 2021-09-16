import { ClarityTypes } from "../../../../lib/clarity/types";

export interface ArkadikoDikoGuardianV11Contract {
  getStakingRewardsPerBlock: () => Promise<bigint>;
  getVaultRewardsPerBlock: () => Promise<bigint>;
  ERRNOTAUTHORIZED: () => Promise<ClarityTypes.Response<null, bigint>>;
  MINSTAKINGBLOCKREWARDS: () => Promise<bigint>;
  REWARDSPERBLOCKSTART: () => Promise<bigint>;
  STAKINGREWARDSFIRSTYEAR: () => Promise<bigint>;
  contractStartBlock: () => Promise<bigint>;
}
