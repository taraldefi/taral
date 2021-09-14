import { Transaction } from '../../../../lib/transaction';
import { ClarityTypes } from '../../../../lib/clarity/types';

// prettier-ignore

export interface ArkadikoLiquidatorV11Contract {
  notifyRiskyVault: (vaultManager: string, auctionEngine: string, vaultId: number, collType: string, oracle: string) => Transaction<number, number>;
  ERREMERGENCYSHUTDOWNACTIVATED: () => Promise<number>;
  ERRNOLIQUIDATIONREQUIRED: () => Promise<number>;
  ERRNOTAUTHORIZED: () => Promise<number>;
  STATUSOK: () => Promise<number>;
}
