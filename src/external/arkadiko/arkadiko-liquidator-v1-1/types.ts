import { IMetadata } from '../../../../shared/providers/types';
import { Transaction } from '../../../../shared/transaction';

// prettier-ignore

export interface ArkadikoLiquidatorV11Contract {
    notifyRiskyVault: (vaultManager: string, auctionEngine: string, vaultId: number, collType: string, oracle: string, metadata: IMetadata) => Transaction<number, number>;
    ERREMERGENCYSHUTDOWNACTIVATED: () => Promise<number>;
    ERRNOLIQUIDATIONREQUIRED: () => Promise<number>;
    ERRNOTAUTHORIZED: () => Promise<number>;
    STATUSOK: () => Promise<number>;
}
