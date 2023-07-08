
  
  import { Transaction } from 'lib-shared';
  import { ClarityTypes } from 'lib-shared'

  export interface TaralImporterV1Contract {
      appendOrder: (newOrderId: number | bigint, importer: string) => Transaction<boolean, bigint>;
  register: (importer: string, importerName: string, hash: Buffer, importerCategory: string) => Transaction<boolean, bigint>;
  getImporterHash: (importer: string) => Promise<ClarityTypes.Response<Buffer, bigint>>;
  getInfo: () => Promise<ClarityTypes.Response<{
  "version": string
    }, null>>;
  getVersion: () => Promise<string>;
  hashMessage: (message: Buffer) => Promise<Buffer>;
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