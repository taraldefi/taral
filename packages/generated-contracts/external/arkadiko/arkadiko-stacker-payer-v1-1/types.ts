import { ClarityTypes, Transaction } from "lib-shared";

export interface ArkadikoStackerPayerV11Contract {
  payout: (
    vaultId: number | bigint,
    wstx: string,
    usda: string,
    collType: string,
    reserve: string,
    ft: string
  ) => Transaction<boolean, bigint>;
  setStackingStxReceived: (
    stxReceived: number | bigint
  ) => Transaction<boolean, bigint>;
  setStackingStxStacked: (
    amount: number | bigint
  ) => Transaction<boolean, bigint>;
  setStackingUnlockBurnHeight: (
    height: number | bigint
  ) => Transaction<boolean, bigint>;
  toggleStackerPayerShutdown: () => Transaction<boolean, bigint>;
  calculateVaultReward: (vaultId: number | bigint) => Promise<bigint>;
  getStackingStxStacked: () => Promise<ClarityTypes.Response<bigint, null>>;
  getStackingUnlockBurnHeight: () => Promise<
    ClarityTypes.Response<bigint, null>
  >;
  ERRBURNHEIGHTNOTREACHED: () => Promise<bigint>;
  ERREMERGENCYSHUTDOWNACTIVATED: () => Promise<bigint>;
  ERRNOTAUTHORIZED: () => Promise<bigint>;
  payoutVaultId: () => Promise<bigint>;
  stackerPayerShutdownActivated: () => Promise<boolean>;
  stackingStxReceived: () => Promise<bigint>;
  stackingStxStacked: () => Promise<bigint>;
  stackingUnlockBurnHeight: () => Promise<bigint>;
}
