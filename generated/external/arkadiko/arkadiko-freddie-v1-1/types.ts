import { Transaction } from '../../../../shared/transaction';
import { ClarityTypes } from '../../../../shared/clarity/types';
import { IMetadata } from '../../../../shared/providers/types';

// prettier-ignore

export interface ArkadikoFreddieV11Contract {
  accrueStabilityFee: (vaultId: number, collType: string, metadata: IMetadata) => Transaction<boolean, number>;
  burn: (vaultId: number, debt: number, reserve: string, ft: string, collType: string, metadata: IMetadata) => Transaction<boolean, number>;
  calculateCurrentCollateralToDebtRatio: (vaultId: number, collType: string, oracle: string, metadata: IMetadata) => Transaction<number, number>;
  closeVault: (vaultId: number, reserve: string, ft: string, collType: string, metadata: IMetadata) => Transaction<boolean, number>;
  collateralizeAndMint: (collateralAmount: number, debt: number, poxSettings: {
    "auto-payoff": boolean;
  "stack-pox": boolean
      }, collateralType: string, reserve: string, ft: string, collType: string, oracle: string, metadata: IMetadata) => Transaction<number, number>;
  deposit: (vaultId: number, uamount: number, reserve: string, ft: string, collType: string, metadata: IMetadata) => Transaction<boolean, number>;
  finalizeLiquidation: (vaultId: number, leftoverCollateral: number, collType: string, metadata: IMetadata) => Transaction<boolean, number>;
  getStabilityFeeForVault: (vaultId: number, collType: string, metadata: IMetadata) => Transaction<number, number>;
  liquidate: (vaultId: number, collType: string, metadata: IMetadata) => Transaction<{
    "discount": number;
  "extra-debt": number;
  "ustx-amount": number;
  "vault-debt": number
      }, number>;
  migrateFunds: (newVaultManager: string, token: string, metadata: IMetadata) => Transaction<boolean, number>;
  migrateState: (newVaultManager: string, metadata: IMetadata) => Transaction<boolean, number>;
  mint: (vaultId: number, extraDebt: number, reserve: string, collType: string, oracle: string, metadata: IMetadata) => Transaction<boolean, number>;
  payStabilityFee: (vaultId: number, collType: string, metadata: IMetadata) => Transaction<number, number>;
  redeemAuctionCollateral: (ft: string, tokenString: string, reserve: string, collateralAmount: number, sender: string, metadata: IMetadata) => Transaction<boolean, number>;
  redeemStx: (ustxAmount: number, metadata: IMetadata) => Transaction<boolean, number>;
  redeemTokens: (usdaAmount: number, dikoAmount: number, metadata: IMetadata) => Transaction<boolean, number>;
  releaseStackedStx: (vaultId: number, metadata: IMetadata) => Transaction<boolean, number>;
  setBlockHeightLastPaid: (newBlockHeightLastPaid: number, metadata: IMetadata) => Transaction<boolean, number>;
  setMaximumDebtSurplus: (newMaximumDebtSurplus: number, metadata: IMetadata) => Transaction<boolean, number>;
  setStackingUnlockBurnHeight: (name: string, burnHeight: number, metadata: IMetadata) => Transaction<boolean, number>;
  setStxRedeemable: (newStxRedeemable: number, metadata: IMetadata) => Transaction<boolean, number>;
  stackCollateral: (vaultId: number, metadata: IMetadata) => Transaction<boolean, number>;
  toggleFreddieShutdown: (metadata: IMetadata) => Transaction<boolean, number>;
  toggleStacking: (vaultId: number, metadata: IMetadata) => Transaction<boolean, number>;
  withdraw: (vaultId: number, uamount: number, reserve: string, ft: string, collType: string, oracle: string, metadata: IMetadata) => Transaction<boolean, number>;
  withdrawLeftoverCollateral: (vaultId: number, reserve: string, ft: string, collType: string, metadata: IMetadata) => Transaction<boolean, number>;
  getCollateralTokenForVault: (vaultId: number, metadata: IMetadata) => Promise<ClarityTypes.Response<string, null>>;
  getCollateralTypeForVault: (vaultId: number, metadata: IMetadata) => Promise<ClarityTypes.Response<string, null>>;
  getDikoBalance: (metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
  getStackingUnlockBurnHeight: (name: string, metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
  getStxRedeemable: (metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
  getUsdaBalance: (metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
  getVaultById: (vaultId: number, metadata: IMetadata) => Promise<{
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
  getVaultEntries: (user: string, metadata: IMetadata) => Promise<{
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
