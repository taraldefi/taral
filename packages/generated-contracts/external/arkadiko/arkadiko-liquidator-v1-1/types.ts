

import { Transaction } from 'taral-shared';

export interface ArkadikoLiquidatorV11Contract {
    notifyRiskyVault: (vaultManager: string, auctionEngine: string, vaultId: number | bigint, collType: string, oracle: string) => Transaction<bigint, bigint>;
    ERREMERGENCYSHUTDOWNACTIVATED: () => Promise<bigint>;
    ERRNOLIQUIDATIONREQUIRED: () => Promise<bigint>;
    ERRNOTAUTHORIZED: () => Promise<bigint>;
    STATUSOK: () => Promise<bigint>;
}
