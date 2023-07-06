
  
  import { Transaction } from 'lib-shared';
  import { ClarityTypes } from 'lib-shared'

  export interface TaralImporterV1Contract {
      appendOrder: (newOrderId: number | bigint, importer: string, hash: Buffer) => Transaction<boolean, bigint>;
  register: (importer: string, importerName: string, hash: Buffer, importerCategory: string) => Transaction<boolean, bigint>;
  getInfo: () => Promise<ClarityTypes.Response<{
  "version": string
    }, null>>;
  getVersion: () => Promise<string>;
  hashMessage: (message: Buffer) => Promise<Buffer>;
  validateSignature: (hash: Buffer, signature: Buffer, signer: string) => Promise<boolean>;
  ERRGENERIC: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERRIMPORTERALREADYREGISTERED: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERRIMPORTERNOTREGISTERED: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_EMPTY_HASH: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_EMPTY_SIGNATURE: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_INVALID_SIGNATURE: () => Promise<ClarityTypes.Response<null, bigint>>;
  VERSION: () => Promise<string>;
  importerStorageError: () => Promise<ClarityTypes.Response<null, bigint>>;
  messagePrefix: () => Promise<Buffer>;
  }