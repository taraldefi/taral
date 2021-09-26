
  
  import { Transaction } from 'lib-shared';
  import { ClarityTypes } from 'lib-shared'

  export interface ArkadikoFreddieV11Contract {
      accrueStabilityFee: (vaultId: number | bigint, collType: string) => Transaction<boolean, bigint>;
  burn: (vaultId: number | bigint, debt: number | bigint, reserve: string, ft: string, collType: string) => Transaction<boolean, bigint>;
  calculateCurrentCollateralToDebtRatio: (vaultId: number | bigint, collType: string, oracle: string, includeStabilityFees: boolean) => Transaction<bigint, bigint>;
  closeVault: (vaultId: number | bigint, reserve: string, ft: string, collType: string) => Transaction<boolean, bigint>;
  collateralizeAndMint: (collateralAmount: number | bigint, debt: number | bigint, poxSettings: {
  "auto-payoff": boolean;
  "stack-pox": boolean
    }, collateralType: string, reserve: string, ft: string, collType: string, oracle: string) => Transaction<bigint, bigint>;
  deposit: (vaultId: number | bigint, uamount: number | bigint, reserve: string, ft: string, collType: string) => Transaction<boolean, bigint>;
  finalizeLiquidation: (vaultId: number | bigint, leftoverCollateral: number | bigint, collType: string) => Transaction<boolean, bigint>;
  getStabilityFeeForVault: (vaultId: number | bigint, collType: string) => Transaction<bigint, bigint>;
  liquidate: (vaultId: number | bigint, collType: string) => Transaction<{
  "discount": bigint;
  "extra-debt": bigint;
  "ustx-amount": bigint;
  "vault-debt": bigint
    }, bigint>;
  migrateFunds: (newVaultManager: string, token: string) => Transaction<boolean, bigint>;
  migrateState: (newVaultManager: string) => Transaction<boolean, bigint>;
  mint: (vaultId: number | bigint, extraDebt: number | bigint, reserve: string, collType: string, oracle: string) => Transaction<boolean, bigint>;
  payStabilityFee: (vaultId: number | bigint, collType: string) => Transaction<bigint, bigint>;
  redeemAuctionCollateral: (ft: string, tokenString: string, reserve: string, collateralAmount: number | bigint, sender: string) => Transaction<boolean, bigint>;
  redeemStx: (ustxAmount: number | bigint) => Transaction<boolean, bigint>;
  redeemTokens: (usdaAmount: number | bigint, dikoAmount: number | bigint) => Transaction<boolean, bigint>;
  releaseStackedStx: (vaultId: number | bigint) => Transaction<boolean, bigint>;
  setBlockHeightLastPaid: (newBlockHeightLastPaid: number | bigint) => Transaction<boolean, bigint>;
  setMaximumDebtSurplus: (newMaximumDebtSurplus: number | bigint) => Transaction<boolean, bigint>;
  setStackingUnlockBurnHeight: (name: string, burnHeight: number | bigint) => Transaction<boolean, bigint>;
  setStxRedeemable: (newStxRedeemable: number | bigint) => Transaction<boolean, bigint>;
  stackCollateral: (vaultId: number | bigint) => Transaction<boolean, bigint>;
  toggleFreddieShutdown: () => Transaction<boolean, bigint>;
  toggleStacking: (vaultId: number | bigint) => Transaction<boolean, bigint>;
  withdraw: (vaultId: number | bigint, uamount: number | bigint, reserve: string, ft: string, collType: string, oracle: string) => Transaction<boolean, bigint>;
  withdrawLeftoverCollateral: (vaultId: number | bigint, reserve: string, ft: string, collType: string) => Transaction<boolean, bigint>;
  getCollateralTokenForVault: (vaultId: number | bigint) => Promise<ClarityTypes.Response<string, null>>;
  getCollateralTypeForVault: (vaultId: number | bigint) => Promise<ClarityTypes.Response<string, null>>;
  getDikoBalance: () => Promise<ClarityTypes.Response<bigint, null>>;
  getStackingUnlockBurnHeight: (name: string) => Promise<ClarityTypes.Response<bigint, null>>;
  getStxRedeemable: () => Promise<ClarityTypes.Response<bigint, null>>;
  getUsdaBalance: () => Promise<ClarityTypes.Response<bigint, null>>;
  getVaultById: (vaultId: number | bigint) => Promise<{
  "auction-ended": boolean;
  "auto-payoff": boolean;
  "collateral": bigint;
  "collateral-token": string;
  "collateral-type": string;
  "created-at-block-height": bigint;
  "debt": bigint;
  "id": bigint;
  "is-liquidated": boolean;
  "leftover-collateral": bigint;
  "owner": string;
  "revoked-stacking": boolean;
  "stability-fee-accrued": bigint;
  "stability-fee-last-accrued": bigint;
  "stacked-tokens": bigint;
  "stacker-name": string;
  "updated-at-block-height": bigint
    }>;
  getVaultEntries: (user: string) => Promise<{
  "ids": bigint[]
    }>;
  BLOCKSPERDAY: () => Promise<bigint>;
  ERRAUCTIONNOTENDED: () => Promise<bigint>;
  ERRBURNFAILED: () => Promise<bigint>;
  ERRBURNHEIGHTNOTREACHED: () => Promise<bigint>;
  ERRDEPOSITFAILED: () => Promise<bigint>;
  ERREMERGENCYSHUTDOWNACTIVATED: () => Promise<bigint>;
  ERRINSUFFICIENTCOLLATERAL: () => Promise<bigint>;
  ERRLIQUIDATIONFAILED: () => Promise<bigint>;
  ERRMAXIMUMDEBTREACHED: () => Promise<bigint>;
  ERRMINTFAILED: () => Promise<bigint>;
  ERRMINTERFAILED: () => Promise<bigint>;
  ERRNOTAUTHORIZED: () => Promise<bigint>;
  ERRSTACKINGINPROGRESS: () => Promise<bigint>;
  ERRTRANSFERFAILED: () => Promise<bigint>;
  ERRVAULTLIQUIDATED: () => Promise<bigint>;
  ERRVAULTNOTLIQUIDATED: () => Promise<bigint>;
  ERRWITHDRAWFAILED: () => Promise<bigint>;
  ERRWRONGCOLLATERALTOKEN: () => Promise<bigint>;
  ERRWRONGDEBT: () => Promise<bigint>;
  blockHeightLastPaid: () => Promise<bigint>;
  freddieShutdownActivated: () => Promise<boolean>;
  maximumDebtSurplus: () => Promise<bigint>;
  stxRedeemable: () => Promise<bigint>;
  stackingUnlockBurnHeight: (key: {
  "stacker-name": string
    }) => Promise<{
  "height": bigint
    } | null>;
  }