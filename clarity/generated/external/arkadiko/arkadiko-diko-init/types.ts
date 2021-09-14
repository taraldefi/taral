import { Transaction } from "../../../../lib/transaction";
import { ClarityTypes } from "../../../../lib/clarity/types";

// prettier-ignore

export interface ArkadikoDikoInitContract {
  foundationClaimTokens: (amount: number) => Transaction<boolean, number>;
  foundersClaimTokens: (amount: number) => Transaction<boolean, number>;
  setFoundationWallet: (address: string) => Transaction<boolean, number>;
  setFoundersWallet: (address: string) => Transaction<boolean, number>;
  getClaimedFoundationTokens: () => Promise<number>;
  getClaimedFoundersTokens: () => Promise<number>;
  getPendingFoundationTokens: () => Promise<ClarityTypes.Response<number, null>>;
  getPendingFoundersTokens: () => Promise<ClarityTypes.Response<number, null>>;
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
