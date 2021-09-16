import { Transaction } from '../../../../lib/transaction';
import { ClarityTypes } from '../../../../lib/clarity/types';

// prettier-ignore

export interface ArkadikoLiquidatorV11Contract {
  notifyRiskyVault: (vaultManager: string, auctionEngine: string, vaultId: number | bigint, collType: string, oracle: string) => Transaction<bigint, bigint>;
  ERREMERGENCYSHUTDOWNACTIVATED: () => Promise<bigint>;
  ERRNOLIQUIDATIONREQUIRED: () => Promise<bigint>;
  ERRNOTAUTHORIZED: () => Promise<bigint>;
  STATUSOK: () => Promise<bigint>;
}
