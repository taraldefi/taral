import { Transaction } from "../../../../shared/transaction";
import { ClarityTypes } from "../../../../shared/clarity/types";
import { IMetadata } from "../../../../shared/providers/types";

// prettier-ignore

export interface ArkadikoLiquidatorV11Contract {
  notifyRiskyVault: (vaultManager: string, auctionEngine: string, vaultId: number, collType: string, oracle: string, metadata: IMetadata) => Transaction<number, number>;
  ERREMERGENCYSHUTDOWNACTIVATED: () => Promise<number>;
  ERRNOLIQUIDATIONREQUIRED: () => Promise<number>;
  ERRNOTAUTHORIZED: () => Promise<number>;
  STATUSOK: () => Promise<number>;
}
