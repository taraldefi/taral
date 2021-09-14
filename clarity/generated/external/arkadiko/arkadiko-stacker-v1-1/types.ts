import { Transaction } from '../../../../lib/transaction';
import { ClarityTypes } from '../../../../lib/clarity/types';

// prettier-ignore

export interface ArkadikoStackerV11Contract {
  enableVaultWithdrawals: (vaultId: number) => Transaction<boolean, number>;
  initiateStacking: (poxAddr: {
    "hashbytes": Buffer;
  "version": Buffer
      }, startBurnHt: number, lockPeriod: number) => Transaction<number, number>;
  requestStxForPayout: (ustxAmount: number) => Transaction<boolean, number>;
  returnStx: (ustxAmount: number) => Transaction<boolean, number>;
  toggleStackerShutdown: () => Transaction<boolean, number>;
  getStackingStxStacked: () => Promise<ClarityTypes.Response<number, null>>;
  getStackingUnlockBurnHeight: () => Promise<ClarityTypes.Response<number, null>>;
  getStxBalance: () => Promise<number>;
  ERRALREADYSTACKING: () => Promise<number>;
  ERRBURNHEIGHTNOTREACHED: () => Promise<number>;
  ERREMERGENCYSHUTDOWNACTIVATED: () => Promise<number>;
  ERRNOTAUTHORIZED: () => Promise<number>;
  ERRSTILLSTACKING: () => Promise<number>;
  ERRVAULTLIQUIDATED: () => Promise<number>;
  ERRWRONGCOLLATERALTOKEN: () => Promise<number>;
  ERRWRONGSTACKER: () => Promise<number>;
  stackerName: () => Promise<string>;
  stackerShutdownActivated: () => Promise<boolean>;
  stackingStxStacked: () => Promise<number>;
  stackingUnlockBurnHeight: () => Promise<number>;
}
