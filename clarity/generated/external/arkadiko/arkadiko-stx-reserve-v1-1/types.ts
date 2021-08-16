import { Transaction } from '../../../../lib/transaction';
import { ClarityTypes } from '../../../../lib/clarity/types';
import { IMetadata } from '../../../../lib/providers/types';

// prettier-ignore

export interface ArkadikoStxReserveV11Contract {
  addTokensToStack: (name: string, tokenAmount: number, metadata: IMetadata) => Transaction<number, number>;
  burn: (token: string, vaultOwner: string, collateralToReturn: number, metadata: IMetadata) => Transaction<boolean, number>;
  calculateCurrentCollateralToDebtRatio: (token: string, debt: number, ustx: number, oracle: string, metadata: IMetadata) => Transaction<number, number>;
  calculateUsdaCount: (token: string, ustxAmount: number, collateralizationRatio: number, oracle: string, metadata: IMetadata) => Transaction<number, null>;
  collateralizeAndMint: (token: string, tokenString: string, ustxAmount: number, debt: number, sender: string, stackerName: string, stackPox: boolean, metadata: IMetadata) => Transaction<number, number>;
  deposit: (token: string, tokenString: string, additionalUstxAmount: number, stackerName: string, metadata: IMetadata) => Transaction<boolean, number>;
  migrateFunds: (newVault: string, metadata: IMetadata) => Transaction<boolean, number>;
  migrateState: (newVault: string, metadata: IMetadata) => Transaction<boolean, number>;
  mint: (tokenString: string, vaultOwner: string, ustxAmount: number, currentDebt: number, extraDebt: number, collateralizationRatio: number, oracle: string, metadata: IMetadata) => Transaction<boolean, number>;
  redeemCollateral: (token: string, tokenString: string, stxCollateral: number, owner: string, metadata: IMetadata) => Transaction<boolean, number>;
  redeemXstx: (ustxAmount: number, sender: string, metadata: IMetadata) => Transaction<boolean, number>;
  requestStxToAutoPayoff: (requestedUstx: number, metadata: IMetadata) => Transaction<boolean, number>;
  requestStxToStack: (name: string, requestedUstx: number, metadata: IMetadata) => Transaction<boolean, number>;
  setNextStackerName: (stackerName: string, metadata: IMetadata) => Transaction<boolean, number>;
  setTokensToStack: (name: string, newTokensToStack: number, metadata: IMetadata) => Transaction<boolean, number>;
  subtractTokensToStack: (name: string, tokenAmount: number, metadata: IMetadata) => Transaction<number, number>;
  toggleStacking: (stackerName: string, revokedStacking: boolean, ustxCollateral: number, metadata: IMetadata) => Transaction<number, number>;
  withdraw: (token: string, tokenString: string, vaultOwner: string, ustxAmount: number, metadata: IMetadata) => Transaction<boolean, number>;
  getNextStackerName: (metadata: IMetadata) => Promise<string>;
  getStxBalance: (metadata: IMetadata) => Promise<number>;
  getTokensToStack: (name: string, metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
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
