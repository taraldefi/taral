import { ClarityTypes } from "../../../../lib/clarity/types";
import { Transaction } from "../../../../lib/transaction";

export interface ArkadikoDikoInitContract {
  foundationClaimTokens: (
    amount: number | bigint
  ) => Transaction<boolean, bigint>;
  foundersClaimTokens: (
    amount: number | bigint
  ) => Transaction<boolean, bigint>;
  setFoundationWallet: (address: string) => Transaction<boolean, bigint>;
  setFoundersWallet: (address: string) => Transaction<boolean, bigint>;
  getClaimedFoundationTokens: () => Promise<bigint>;
  getClaimedFoundersTokens: () => Promise<bigint>;
  getPendingFoundationTokens: () => Promise<
    ClarityTypes.Response<bigint, null>
  >;
  getPendingFoundersTokens: () => Promise<ClarityTypes.Response<bigint, null>>;
  BLOCKSPERMONTH: () => Promise<bigint>;
  ERRNOTAUTHORIZED: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERRTOOMANYTOKENSCLAIMED: () => Promise<ClarityTypes.Response<null, bigint>>;
  FOUNDERSTOKENSPERMONTH: () => Promise<bigint>;
  TOTALFOUNDATION: () => Promise<bigint>;
  TOTALFOUNDERS: () => Promise<bigint>;
  contractStartBlock: () => Promise<bigint>;
  foundationTokensClaimed: () => Promise<bigint>;
  foundationWallet: () => Promise<string>;
  foundersTokensClaimed: () => Promise<bigint>;
  foundersWallet: () => Promise<string>;
}
