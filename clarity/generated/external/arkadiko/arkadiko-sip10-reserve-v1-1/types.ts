import { Transaction } from "../../../../lib/transaction";
import { ClarityTypes } from "../../../../lib/clarity/types";

// prettier-ignore

export interface ArkadikoSip10ReserveV11Contract {
  burn: (token: string, vaultOwner: string, collateralToReturn: number) => Transaction<boolean, number>;
  burnXstx: (ustxAmount: number, sender: string) => Transaction<boolean, number>;
  calculateCurrentCollateralToDebtRatio: (token: string, debt: number, ucollateral: number, oracle: string) => Transaction<number, number>;
  calculateUsdaCount: (token: string, ucollateralAmount: number, collateralizationRatio: number, oracle: string) => Transaction<number, null>;
  collateralizeAndMint: (token: string, tokenString: string, ucollateralAmount: number, debt: number, sender: string, stackerName: string, stackPox: boolean) => Transaction<number, number>;
  deposit: (token: string, tokenString: string, additionalUcollateralAmount: number, stackerName: string) => Transaction<boolean, number>;
  migrateFunds: (newVault: string, token: string) => Transaction<boolean, number>;
  mint: (tokenString: string, vaultOwner: string, ucollateralAmount: number, currentDebt: number, extraDebt: number, collateralizationRatio: number, oracle: string) => Transaction<boolean, number>;
  mintXstx: (collateral: number) => Transaction<boolean, number>;
  redeemCollateral: (token: string, tokenString: string, ucollateral: number, owner: string) => Transaction<boolean, number>;
  withdraw: (token: string, tokenString: string, vaultOwner: string, ucollateralAmount: number) => Transaction<boolean, number>;
  ERRDEPOSITFAILED: () => Promise<number>;
  ERRMINTFAILED: () => Promise<number>;
  ERRNOTAUTHORIZED: () => Promise<number>;
  ERRTOOMUCHDEBT: () => Promise<number>;
  ERRTRANSFERFAILED: () => Promise<number>;
  ERRWITHDRAWFAILED: () => Promise<number>;
  ERRWRONGTOKEN: () => Promise<number>;
}
