import { Transaction } from '../../../../lib/transaction';
import { ClarityTypes } from '../../../../lib/clarity/types';

// prettier-ignore

export interface ArkadikoStackerPayerV11Contract {
  payout: (vaultId: number, wstx: string, usda: string, collType: string, reserve: string, ft: string) => Transaction<boolean, number>;
  setStackingStxReceived: (stxReceived: number) => Transaction<boolean, number>;
  setStackingStxStacked: (amount: number) => Transaction<boolean, number>;
  setStackingUnlockBurnHeight: (height: number) => Transaction<boolean, number>;
  toggleStackerPayerShutdown: () => Transaction<boolean, number>;
  calculateVaultReward: (vaultId: number) => Promise<number>;
  getStackingStxStacked: () => Promise<ClarityTypes.Response<number, null>>;
  getStackingUnlockBurnHeight: () => Promise<ClarityTypes.Response<number, null>>;
  ERRBURNHEIGHTNOTREACHED: () => Promise<number>;
  ERREMERGENCYSHUTDOWNACTIVATED: () => Promise<number>;
  ERRNOTAUTHORIZED: () => Promise<number>;
  payoutVaultId: () => Promise<number>;
  stackerPayerShutdownActivated: () => Promise<boolean>;
  stackingStxReceived: () => Promise<number>;
  stackingStxStacked: () => Promise<number>;
  stackingUnlockBurnHeight: () => Promise<number>;
}
