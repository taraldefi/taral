import { Transaction } from '../../../../lib/transaction';
import { ClarityTypes } from '../../../../lib/clarity/types';
import { IMetadata } from '../../../../lib/providers/types';

// prettier-ignore

export interface ArkadikoStackerPayerV11Contract {
  enableVaultWithdrawals: (vaultId: number, metadata: IMetadata) => Transaction<boolean, number>;
  payout: (vaultId: number, wstx: string, usda: string, collType: string, reserve: string, ft: string, metadata: IMetadata) => Transaction<boolean, number>;
  setStackingStxReceived: (stxReceived: number, metadata: IMetadata) => Transaction<boolean, number>;
  setStackingStxStacked: (amount: number, metadata: IMetadata) => Transaction<boolean, number>;
  setStackingUnlockBurnHeight: (height: number, metadata: IMetadata) => Transaction<boolean, number>;
  toggleStackerPayerShutdown: (metadata: IMetadata) => Transaction<boolean, number>;
  calculateVaultReward: (vaultId: number, metadata: IMetadata) => Promise<number>;
  getStackingStxStacked: (metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
  getStackingUnlockBurnHeight: (metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
  ERRBURNHEIGHTNOTREACHED: () => Promise<number>;
  ERREMERGENCYSHUTDOWNACTIVATED: () => Promise<number>;
  ERRNOTAUTHORIZED: () => Promise<number>;
  ERRSTILLSTACKING: () => Promise<number>;
  ERRVAULTLIQUIDATED: () => Promise<number>;
  ERRWRONGCOLLATERALTOKEN: () => Promise<number>;
  payoutVaultId: () => Promise<number>;
  stackerPayerShutdownActivated: () => Promise<boolean>;
  stackingStxReceived: () => Promise<number>;
  stackingStxStacked: () => Promise<number>;
  stackingUnlockBurnHeight: () => Promise<number>;
}
