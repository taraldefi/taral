import { Transaction } from '../../shared/transaction';
import { ClarityTypes } from '../../shared/clarity/types';
import { IMetadata } from '../../shared/providers/types';

// prettier-ignore

export interface ArkadikoStackerV11Contract {
  enableVaultWithdrawals: (vaultId: number, metadata: IMetadata) => Transaction<boolean, number>;
  initiateStacking: (poxAddr: {
    "hashbytes": Buffer;
  "version": Buffer
      }, startBurnHt: number, lockPeriod: number, metadata: IMetadata) => Transaction<number, number>;
  payout: (vaultId: number, wstx: string, usda: string, collType: string, reserve: string, ft: string, metadata: IMetadata) => Transaction<boolean, number>;
  requestStxForWithdrawal: (ustxAmount: number, metadata: IMetadata) => Transaction<boolean, number>;
  setStackingStxReceived: (stxReceived: number, metadata: IMetadata) => Transaction<boolean, number>;
  toggleStackerShutdown: (metadata: IMetadata) => Transaction<boolean, number>;
  calculateVaultReward: (vaultId: number, metadata: IMetadata) => Promise<number>;
  getStackingStxStacked: (metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
  getStackingUnlockBurnHeight: (metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
  getStxBalance: (metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
  ERRALREADYSTACKING: () => Promise<number>;
  ERRBURNHEIGHTNOTREACHED: () => Promise<number>;
  ERREMERGENCYSHUTDOWNACTIVATED: () => Promise<number>;
  ERRNOTAUTHORIZED: () => Promise<number>;
  ERRVAULTLIQUIDATED: () => Promise<number>;
  ERRWRONGCOLLATERALTOKEN: () => Promise<number>;
  payoutVaultId: () => Promise<number>;
  stackerShutdownActivated: () => Promise<boolean>;
  stackingStxReceived: () => Promise<number>;
  stackingStxStacked: () => Promise<number>;
  stackingUnlockBurnHeight: () => Promise<number>;
}
