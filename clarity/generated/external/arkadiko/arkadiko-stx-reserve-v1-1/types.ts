import { Transaction } from "../../../../lib/transaction";
import { ClarityTypes } from "../../../../lib/clarity/types";

// prettier-ignore

export interface ArkadikoStxReserveV11Contract {
  addTokensToStack: (name: string, tokenAmount: number) => Transaction<number, number>;
  burn: (token: string, vaultOwner: string, collateralToReturn: number) => Transaction<boolean, number>;
  calculateCurrentCollateralToDebtRatio: (token: string, debt: number, ustx: number, oracle: string) => Transaction<number, number>;
  calculateUsdaCount: (token: string, ustxAmount: number, collateralizationRatio: number, oracle: string) => Transaction<number, null>;
  collateralizeAndMint: (token: string, tokenString: string, ustxAmount: number, debt: number, sender: string, stackerName: string, stackPox: boolean) => Transaction<number, number>;
  deposit: (token: string, tokenString: string, additionalUstxAmount: number, stackerName: string) => Transaction<boolean, number>;
  migrateFunds: (newVault: string) => Transaction<boolean, number>;
  migrateState: (newVault: string) => Transaction<boolean, number>;
  mint: (tokenString: string, vaultOwner: string, ustxAmount: number, currentDebt: number, extraDebt: number, collateralizationRatio: number, oracle: string) => Transaction<boolean, number>;
  redeemCollateral: (token: string, tokenString: string, stxCollateral: number, owner: string) => Transaction<boolean, number>;
  redeemXstx: (ustxAmount: number, sender: string) => Transaction<boolean, number>;
  requestStxToAutoPayoff: (requestedUstx: number) => Transaction<boolean, number>;
  requestStxToStack: (name: string, requestedUstx: number) => Transaction<boolean, number>;
  setNextStackerName: (stackerName: string) => Transaction<boolean, number>;
  setTokensToStack: (name: string, newTokensToStack: number) => Transaction<boolean, number>;
  subtractTokensToStack: (name: string, tokenAmount: number) => Transaction<number, number>;
  toggleStacking: (stackerName: string, revokedStacking: boolean, ustxCollateral: number) => Transaction<number, number>;
  withdraw: (token: string, tokenString: string, vaultOwner: string, ustxAmount: number) => Transaction<boolean, number>;
  getNextStackerName: () => Promise<string>;
  getStxBalance: () => Promise<number>;
  getTokensToStack: (name: string) => Promise<ClarityTypes.Response<number, null>>;
  ERRBURNFAILED: () => Promise<number>;
  ERRDEPOSITFAILED: () => Promise<number>;
  ERRMINTFAILED: () => Promise<number>;
  ERRMINTERFAILED: () => Promise<number>;
  ERRNOTAUTHORIZED: () => Promise<number>;
  ERRTOOMUCHDEBT: () => Promise<number>;
  ERRTRANSFERFAILED: () => Promise<number>;
  ERRWITHDRAWFAILED: () => Promise<number>;
  ERRWRONGTOKEN: () => Promise<number>;
  nextStackerName: () => Promise<string>;
  tokensToStack: (key: {
    "stacker-name": string
      }) => Promise<{
    "amount": number
      } | null>;
}
