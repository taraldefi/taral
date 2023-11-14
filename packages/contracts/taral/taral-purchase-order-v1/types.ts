import { Transaction } from "lib-shared";
import { ClarityTypes } from "lib-shared";

export interface TaralPurchaseOrderV1Contract {
  checkIfUserHoldsTalToken: (user: string) => Transaction<boolean, null>;
  createVault: (
    collateralStx: number | bigint,
    collateralBtc: number | bigint,
    loanAmount: number | bigint,
    duration: number | bigint,
  ) => Transaction<bigint, bigint>;
  initialize: (
    exporter: string,
    importer: string,
    orderHash: Buffer,
    orderDetailHash: Buffer,
    paymentTerm: string,
    amount: number | bigint,
    deliveryTerm: string,
  ) => Transaction<boolean, bigint>;
  liquidate: (vaultId: number | bigint) => Transaction<bigint, bigint>;
  repayLoan: (
    vaultId: number | bigint,
    repaymentAmount: number | bigint,
  ) => Transaction<bigint, bigint>;
  getInfo: () => Promise<
    ClarityTypes.Response<
      {
        version: string;
      },
      null
    >
  >;
  getVersion: () => Promise<string>;
  DEBT_RATIO: () => Promise<bigint>;
  ERRGENERIC: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_CONTRACT_CALL: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_EMPTY_HASH: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_INSUFFICIENT_COLLATERAL: () => Promise<
    ClarityTypes.Response<null, bigint>
  >;
  ERR_INSUFFICIENT_REPAYMENT: () => Promise<
    ClarityTypes.Response<null, bigint>
  >;
  ERR_INVALID_LOAN_AMOUNT: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_INVALID_LOAN_DURATION: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_INVALID_VAULT: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_PURCHASE_ORDER_STORAGE: () => Promise<
    ClarityTypes.Response<null, bigint>
  >;
  ERR_VAULT_NOT_FOUND: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_VAULT_NOT_UNDERCOLLATERALIZED: () => Promise<
    ClarityTypes.Response<null, bigint>
  >;
  MIN_BTC_COLLATERAL_AMOUNT: () => Promise<bigint>;
  MIN_COLLATERAL_AMOUNT: () => Promise<bigint>;
  MIN_LOAN_AMOUNT: () => Promise<bigint>;
  VERSION: () => Promise<string>;
}
