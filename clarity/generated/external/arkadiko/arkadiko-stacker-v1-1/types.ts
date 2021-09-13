import { ClarityTypes } from "../../../../lib/clarity/types";
import { IMetadata } from "../../../../lib/providers/types";
import { Transaction } from "../../../../lib/transaction";

// prettier-ignore

export interface ArkadikoStackerV11Contract {
    enableVaultWithdrawals: (vaultId: number, metadata: IMetadata) => Transaction<boolean, number>;
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
