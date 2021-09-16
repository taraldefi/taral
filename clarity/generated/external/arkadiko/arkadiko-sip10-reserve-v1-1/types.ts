import { Transaction } from '../../../../lib/transaction';
import { ClarityTypes } from '../../../../lib/clarity/types';

// prettier-ignore

export interface ArkadikoSip10ReserveV11Contract {
  burn: (token: string, vaultOwner: string, collateralToReturn: number | bigint) => Transaction<boolean, bigint>;
  burnXstx: (ustxAmount: number | bigint, sender: string) => Transaction<boolean, bigint>;
  calculateCurrentCollateralToDebtRatio: (token: string, debt: number | bigint, ucollateral: number | bigint, oracle: string) => Transaction<bigint, bigint>;
  calculateUsdaCount: (token: string, ucollateralAmount: number | bigint, collateralizationRatio: number | bigint, oracle: string) => Transaction<bigint, null>;
  collateralizeAndMint: (token: string, tokenString: string, ucollateralAmount: number | bigint, debt: number | bigint, sender: string, stackerName: string, stackPox: boolean) => Transaction<bigint, bigint>;
  deposit: (token: string, tokenString: string, additionalUcollateralAmount: number | bigint, stackerName: string) => Transaction<boolean, bigint>;
  migrateFunds: (newVault: string, token: string) => Transaction<boolean, bigint>;
  mint: (tokenString: string, vaultOwner: string, ucollateralAmount: number | bigint, currentDebt: number | bigint, extraDebt: number | bigint, collateralizationRatio: number | bigint, oracle: string) => Transaction<boolean, bigint>;
  mintXstx: (collateral: number | bigint) => Transaction<boolean, bigint>;
  redeemCollateral: (token: string, tokenString: string, ucollateral: number | bigint, owner: string) => Transaction<boolean, bigint>;
  withdraw: (token: string, tokenString: string, vaultOwner: string, ucollateralAmount: number | bigint) => Transaction<boolean, bigint>;
  ERRDEPOSITFAILED: () => Promise<bigint>;
  ERRMINTFAILED: () => Promise<bigint>;
  ERRNOTAUTHORIZED: () => Promise<bigint>;
  ERRTOOMUCHDEBT: () => Promise<bigint>;
  ERRTRANSFERFAILED: () => Promise<bigint>;
  ERRWITHDRAWFAILED: () => Promise<bigint>;
  ERRWRONGTOKEN: () => Promise<bigint>;
}
