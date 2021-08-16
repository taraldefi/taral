import { Transaction } from '../../../../lib/transaction';
import { ClarityTypes } from '../../../../lib/clarity/types';
import { IMetadata } from '../../../../lib/providers/types';

// prettier-ignore

export interface ArkadikoDikoInitContract {
  foundationClaimTokens: (amount: number, metadata: IMetadata) => Transaction<boolean, number>;
  foundersClaimTokens: (amount: number, metadata: IMetadata) => Transaction<boolean, number>;
  setFoundationWallet: (address: string, metadata: IMetadata) => Transaction<boolean, number>;
  setFoundersWallet: (address: string, metadata: IMetadata) => Transaction<boolean, number>;
  getClaimedFoundationTokens: (metadata: IMetadata) => Promise<number>;
  getClaimedFoundersTokens: (metadata: IMetadata) => Promise<number>;
  getPendingFoundationTokens: (metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
  getPendingFoundersTokens: (metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
  BLOCKSPERMONTH: () => Promise<number>;
  ERRNOTAUTHORIZED: () => Promise<ClarityTypes.Response<null, number>>;
  ERRTOOMANYTOKENSCLAIMED: () => Promise<ClarityTypes.Response<null, number>>;
  FOUNDERSTOKENSPERMONTH: () => Promise<number>;
  TOTALFOUNDATION: () => Promise<number>;
  TOTALFOUNDERS: () => Promise<number>;
  contractStartBlock: () => Promise<number>;
  foundationTokensClaimed: () => Promise<number>;
  foundationWallet: () => Promise<string>;
  foundersTokensClaimed: () => Promise<number>;
  foundersWallet: () => Promise<string>;
}
