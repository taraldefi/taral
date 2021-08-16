import { Transaction } from '../../../../lib/transaction';
import { ClarityTypes } from '../../../../lib/clarity/types';
import { IMetadata } from '../../../../lib/providers/types';

// prettier-ignore

export interface ArkadikoSip10ReserveV11Contract {
  burn: (token: string, vaultOwner: string, collateralToReturn: number, metadata: IMetadata) => Transaction<boolean, number>;
  burnXstx: (ustxAmount: number, sender: string, metadata: IMetadata) => Transaction<boolean, number>;
  calculateCurrentCollateralToDebtRatio: (token: string, debt: number, ucollateral: number, oracle: string, metadata: IMetadata) => Transaction<number, number>;
  calculateUsdaCount: (token: string, ucollateralAmount: number, collateralizationRatio: number, oracle: string, metadata: IMetadata) => Transaction<number, null>;
  collateralizeAndMint: (token: string, tokenString: string, ucollateralAmount: number, debt: number, sender: string, stackerName: string, stackPox: boolean, metadata: IMetadata) => Transaction<number, number>;
  deposit: (token: string, tokenString: string, additionalUcollateralAmount: number, stackerName: string, metadata: IMetadata) => Transaction<boolean, number>;
  migrateFunds: (newVault: string, token: string, metadata: IMetadata) => Transaction<boolean, number>;
  mint: (tokenString: string, vaultOwner: string, ucollateralAmount: number, currentDebt: number, extraDebt: number, collateralizationRatio: number, oracle: string, metadata: IMetadata) => Transaction<boolean, number>;
  mintXstx: (collateral: number, metadata: IMetadata) => Transaction<boolean, number>;
  redeemCollateral: (token: string, tokenString: string, ucollateral: number, owner: string, metadata: IMetadata) => Transaction<boolean, number>;
  withdraw: (token: string, tokenString: string, vaultOwner: string, ucollateralAmount: number, metadata: IMetadata) => Transaction<boolean, number>;
  ERRDEPOSITFAILED: () => Promise<number>;
  ERRMINTFAILED: () => Promise<number>;
  ERRNOTAUTHORIZED: () => Promise<number>;
  ERRTOOMUCHDEBT: () => Promise<number>;
  ERRTRANSFERFAILED: () => Promise<number>;
  ERRWITHDRAWFAILED: () => Promise<number>;
  ERRWRONGTOKEN: () => Promise<number>;
}
