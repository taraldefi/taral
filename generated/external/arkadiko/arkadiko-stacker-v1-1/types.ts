import { Transaction } from '../../../../shared/transaction';
import { ClarityTypes } from '../../../../shared/clarity/types';
import { IMetadata } from '../../../../shared/providers/types';

// prettier-ignore

export interface ArkadikoStackerV11Contract {
  initiateStacking: (poxAddr: {
    "hashbytes": Buffer;
  "version": Buffer
      }, startBurnHt: number, lockPeriod: number, metadata: IMetadata) => Transaction<number, number>;
  requestStxForPayout: (ustxAmount: number, metadata: IMetadata) => Transaction<boolean, number>;
  returnStx: (ustxAmount: number, metadata: IMetadata) => Transaction<boolean, number>;
  toggleStackerShutdown: (metadata: IMetadata) => Transaction<boolean, number>;
  getStackingStxStacked: (metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
  getStackingUnlockBurnHeight: (metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
  getStxBalance: (metadata: IMetadata) => Promise<number>;
  ERRALREADYSTACKING: () => Promise<number>;
  ERREMERGENCYSHUTDOWNACTIVATED: () => Promise<number>;
  ERRNOTAUTHORIZED: () => Promise<number>;
  stackerName: () => Promise<string>;
  stackerShutdownActivated: () => Promise<boolean>;
  stackingStxStacked: () => Promise<number>;
  stackingUnlockBurnHeight: () => Promise<number>;
}
