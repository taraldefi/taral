
  
  import { Transaction } from 'lib-shared';
  import { ClarityTypes } from 'lib-shared'

  export interface TaralPurchaseOrderV1Contract {
      checkIfUserHoldsTalToken: (user: string) => Transaction<boolean, null>;
  initialize: (exporter: string, importer: string, orderHash: Buffer, orderDetailHash: Buffer, paymentTerm: string, amount: number | bigint, deliveryTerm: string) => Transaction<boolean, bigint>;
  getInfo: () => Promise<ClarityTypes.Response<{
  "version": string
    }, null>>;
  getVersion: () => Promise<string>;
  ERREXPORTERNOTREGISTERED: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERRGENERIC: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERRIMPORTERNOTREGISTERED: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERRPERMISSIONDENIED: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_CONTRACT_CALL: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_EMPTY_HASH: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_PURCHASE_ORDER_STORAGE: () => Promise<ClarityTypes.Response<null, bigint>>;
  VERSION: () => Promise<string>;
  }