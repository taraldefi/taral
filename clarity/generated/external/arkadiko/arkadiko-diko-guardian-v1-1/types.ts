import { Transaction } from '../../../../lib/transaction';
import { ClarityTypes } from '../../../../lib/clarity/types';

// prettier-ignore

export interface ArkadikoDikoGuardianV11Contract {
  getStakingRewardsPerBlock: () => Promise<number>;
  getVaultRewardsPerBlock: () => Promise<number>;
  ERRNOTAUTHORIZED: () => Promise<ClarityTypes.Response<null, number>>;
  MINSTAKINGBLOCKREWARDS: () => Promise<number>;
  REWARDSPERBLOCKSTART: () => Promise<number>;
  STAKINGREWARDSFIRSTYEAR: () => Promise<number>;
  contractStartBlock: () => Promise<number>;
}
