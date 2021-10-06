
  
  import { Transaction } from 'lib-shared';
  import { ClarityTypes } from 'lib-shared'

  export interface ArkadikoStackerV11Contract {
      enableVaultWithdrawals: (vaultId: number | bigint) => Transaction<boolean, bigint>;
  initiateStacking: (poxAddr: {
  "hashbytes": Buffer;
  "version": Buffer
    }, startBurnHt: number | bigint, lockPeriod: number | bigint) => Transaction<bigint, bigint>;
  requestStxForPayout: (ustxAmount: number | bigint) => Transaction<boolean, bigint>;
  returnStx: (ustxAmount: number | bigint) => Transaction<boolean, bigint>;
  toggleStackerShutdown: () => Transaction<boolean, bigint>;
  getStackingStxStacked: () => Promise<ClarityTypes.Response<bigint, null>>;
  getStackingUnlockBurnHeight: () => Promise<ClarityTypes.Response<bigint, null>>;
  getStxBalance: () => Promise<bigint>;
  ERRALREADYSTACKING: () => Promise<bigint>;
  ERRBURNHEIGHTNOTREACHED: () => Promise<bigint>;
  ERREMERGENCYSHUTDOWNACTIVATED: () => Promise<bigint>;
  ERRNOTAUTHORIZED: () => Promise<bigint>;
  ERRSTILLSTACKING: () => Promise<bigint>;
  ERRVAULTLIQUIDATED: () => Promise<bigint>;
  ERRWRONGCOLLATERALTOKEN: () => Promise<bigint>;
  ERRWRONGSTACKER: () => Promise<bigint>;
  stackerName: () => Promise<string>;
  stackerShutdownActivated: () => Promise<boolean>;
  stackingStxStacked: () => Promise<bigint>;
  stackingUnlockBurnHeight: () => Promise<bigint>;
  }