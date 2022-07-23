import { ClarityTypes, Transaction } from "lib-shared";

export interface ArkadikoStxReserveV11Contract {
  addTokensToStack: (
    name: string,
    tokenAmount: number | bigint
  ) => Transaction<bigint, bigint>;
  burn: (
    token: string,
    vaultOwner: string,
    collateralToReturn: number | bigint
  ) => Transaction<boolean, bigint>;
  calculateCurrentCollateralToDebtRatio: (
    token: string,
    debt: number | bigint,
    ustx: number | bigint,
    oracle: string
  ) => Transaction<bigint, bigint>;
  calculateUsdaCount: (
    token: string,
    ustxAmount: number | bigint,
    collateralizationRatio: number | bigint,
    oracle: string
  ) => Transaction<bigint, null>;
  collateralizeAndMint: (
    token: string,
    tokenString: string,
    ustxAmount: number | bigint,
    debt: number | bigint,
    sender: string,
    stackerName: string,
    stackPox: boolean
  ) => Transaction<bigint, bigint>;
  deposit: (
    token: string,
    tokenString: string,
    additionalUstxAmount: number | bigint,
    stackerName: string
  ) => Transaction<boolean, bigint>;
  migrateFunds: (newVault: string) => Transaction<boolean, bigint>;
  migrateState: (newVault: string) => Transaction<boolean, bigint>;
  mint: (
    tokenString: string,
    vaultOwner: string,
    ustxAmount: number | bigint,
    currentDebt: number | bigint,
    extraDebt: number | bigint,
    collateralizationRatio: number | bigint,
    oracle: string
  ) => Transaction<boolean, bigint>;
  redeemCollateral: (
    token: string,
    tokenString: string,
    stxCollateral: number | bigint,
    owner: string
  ) => Transaction<boolean, bigint>;
  redeemXstx: (
    ustxAmount: number | bigint,
    sender: string
  ) => Transaction<boolean, bigint>;
  requestStxToAutoPayoff: (
    requestedUstx: number | bigint
  ) => Transaction<boolean, bigint>;
  requestStxToStack: (
    name: string,
    requestedUstx: number | bigint
  ) => Transaction<boolean, bigint>;
  setNextStackerName: (stackerName: string) => Transaction<boolean, bigint>;
  setTokensToStack: (
    name: string,
    newTokensToStack: number | bigint
  ) => Transaction<boolean, bigint>;
  subtractTokensToStack: (
    name: string,
    tokenAmount: number | bigint
  ) => Transaction<bigint, bigint>;
  toggleStacking: (
    stackerName: string,
    revokedStacking: boolean,
    ustxCollateral: number | bigint
  ) => Transaction<bigint, bigint>;
  withdraw: (
    token: string,
    tokenString: string,
    vaultOwner: string,
    ustxAmount: number | bigint
  ) => Transaction<boolean, bigint>;
  getNextStackerName: () => Promise<string>;
  getStxBalance: () => Promise<bigint>;
  getTokensToStack: (
    name: string
  ) => Promise<ClarityTypes.Response<bigint, null>>;
  ERRBURNFAILED: () => Promise<bigint>;
  ERRDEPOSITFAILED: () => Promise<bigint>;
  ERRMINTFAILED: () => Promise<bigint>;
  ERRMINTERFAILED: () => Promise<bigint>;
  ERRNOTAUTHORIZED: () => Promise<bigint>;
  ERRTOOMUCHDEBT: () => Promise<bigint>;
  ERRTRANSFERFAILED: () => Promise<bigint>;
  ERRWITHDRAWFAILED: () => Promise<bigint>;
  ERRWRONGTOKEN: () => Promise<bigint>;
  nextStackerName: () => Promise<string>;
  tokensToStack: (key: { "stacker-name": string }) => Promise<{
    amount: bigint;
  } | null>;
}
