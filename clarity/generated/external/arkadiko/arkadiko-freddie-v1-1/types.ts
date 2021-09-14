import { Transaction } from '../../../../lib/transaction';
import { ClarityTypes } from '../../../../lib/clarity/types';

// prettier-ignore

export interface ArkadikoFreddieV11Contract {
  accrueStabilityFee: (vaultId: number, collType: string) => Transaction<boolean, number>;
  burn: (vaultId: number, debt: number, reserve: string, ft: string, collType: string) => Transaction<boolean, number>;
  calculateCurrentCollateralToDebtRatio: (vaultId: number, collType: string, oracle: string, includeStabilityFees: boolean) => Transaction<number, number>;
  closeVault: (vaultId: number, reserve: string, ft: string, collType: string) => Transaction<boolean, number>;
  collateralizeAndMint: (collateralAmount: number, debt: number, poxSettings: {
    "auto-payoff": boolean;
  "stack-pox": boolean
      }, collateralType: string, reserve: string, ft: string, collType: string, oracle: string) => Transaction<number, number>;
  deposit: (vaultId: number, uamount: number, reserve: string, ft: string, collType: string) => Transaction<boolean, number>;
  finalizeLiquidation: (vaultId: number, leftoverCollateral: number, collType: string) => Transaction<boolean, number>;
  getStabilityFeeForVault: (vaultId: number, collType: string) => Transaction<number, number>;
  liquidate: (vaultId: number, collType: string) => Transaction<{
    "discount": number;
  "extra-debt": number;
  "ustx-amount": number;
  "vault-debt": number
      }, number>;
  migrateFunds: (newVaultManager: string, token: string) => Transaction<boolean, number>;
  migrateState: (newVaultManager: string) => Transaction<boolean, number>;
  mint: (vaultId: number, extraDebt: number, reserve: string, collType: string, oracle: string) => Transaction<boolean, number>;
  payStabilityFee: (vaultId: number, collType: string) => Transaction<number, number>;
  redeemAuctionCollateral: (ft: string, tokenString: string, reserve: string, collateralAmount: number, sender: string) => Transaction<boolean, number>;
  redeemStx: (ustxAmount: number) => Transaction<boolean, number>;
  redeemTokens: (usdaAmount: number, dikoAmount: number) => Transaction<boolean, number>;
  releaseStackedStx: (vaultId: number) => Transaction<boolean, number>;
  setBlockHeightLastPaid: (newBlockHeightLastPaid: number) => Transaction<boolean, number>;
  setMaximumDebtSurplus: (newMaximumDebtSurplus: number) => Transaction<boolean, number>;
  setStackingUnlockBurnHeight: (name: string, burnHeight: number) => Transaction<boolean, number>;
  setStxRedeemable: (newStxRedeemable: number) => Transaction<boolean, number>;
  stackCollateral: (vaultId: number) => Transaction<boolean, number>;
  toggleFreddieShutdown: () => Transaction<boolean, number>;
  toggleStacking: (vaultId: number) => Transaction<boolean, number>;
  withdraw: (vaultId: number, uamount: number, reserve: string, ft: string, collType: string, oracle: string) => Transaction<boolean, number>;
  withdrawLeftoverCollateral: (vaultId: number, reserve: string, ft: string, collType: string) => Transaction<boolean, number>;
  getCollateralTokenForVault: (vaultId: number) => Promise<ClarityTypes.Response<string, null>>;
  getCollateralTypeForVault: (vaultId: number) => Promise<ClarityTypes.Response<string, null>>;
  getDikoBalance: () => Promise<ClarityTypes.Response<number, null>>;
  getStackingUnlockBurnHeight: (name: string) => Promise<ClarityTypes.Response<number, null>>;
  getStxRedeemable: () => Promise<ClarityTypes.Response<number, null>>;
  getUsdaBalance: () => Promise<ClarityTypes.Response<number, null>>;
  getVaultById: (vaultId: number) => Promise<{
    "auction-ended": boolean;
  "auto-payoff": boolean;
  "collateral": number;
  "collateral-token": string;
  "collateral-type": string;
  "created-at-block-height": number;
  "debt": number;
  "id": number;
  "is-liquidated": boolean;
  "leftover-collateral": number;
  "owner": string;
  "revoked-stacking": boolean;
  "stability-fee-accrued": number;
  "stability-fee-last-accrued": number;
  "stacked-tokens": number;
  "stacker-name": string;
  "updated-at-block-height": number
      }>;
  getVaultEntries: (user: string) => Promise<{
    "ids": number[]
      }>;
  BLOCKSPERDAY: () => Promise<number>;
  ERRAUCTIONNOTENDED: () => Promise<number>;
  ERRBURNFAILED: () => Promise<number>;
  ERRBURNHEIGHTNOTREACHED: () => Promise<number>;
  ERRDEPOSITFAILED: () => Promise<number>;
  ERREMERGENCYSHUTDOWNACTIVATED: () => Promise<number>;
  ERRINSUFFICIENTCOLLATERAL: () => Promise<number>;
  ERRLIQUIDATIONFAILED: () => Promise<number>;
  ERRMAXIMUMDEBTREACHED: () => Promise<number>;
  ERRMINTFAILED: () => Promise<number>;
  ERRMINTERFAILED: () => Promise<number>;
  ERRNOTAUTHORIZED: () => Promise<number>;
  ERRSTACKINGINPROGRESS: () => Promise<number>;
  ERRTRANSFERFAILED: () => Promise<number>;
  ERRVAULTLIQUIDATED: () => Promise<number>;
  ERRVAULTNOTLIQUIDATED: () => Promise<number>;
  ERRWITHDRAWFAILED: () => Promise<number>;
  ERRWRONGCOLLATERALTOKEN: () => Promise<number>;
  ERRWRONGDEBT: () => Promise<number>;
  blockHeightLastPaid: () => Promise<number>;
  freddieShutdownActivated: () => Promise<boolean>;
  maximumDebtSurplus: () => Promise<number>;
  stxRedeemable: () => Promise<number>;
  stackingUnlockBurnHeight: (key: {
    "stacker-name": string
      }) => Promise<{
    "height": number
      } | null>;
}
