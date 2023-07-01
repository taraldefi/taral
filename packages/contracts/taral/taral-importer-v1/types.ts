
  
  import { Transaction } from 'lib-shared';
  import { ClarityTypes } from 'lib-shared'

  export interface TaralImporterV1Contract {
      appendOrder: (newOrderId: number | bigint, importer: string, hash: Buffer, signature: Buffer) => Transaction<boolean, bigint>;
  register: (importer: string, hash: Buffer, signature: Buffer, importerName: string, importerCategory: string) => Transaction<boolean, bigint>;
  getInfo: () => Promise<ClarityTypes.Response<{
  "version": string
    }, null>>;
  getVersion: () => Promise<string>;
  hashMessage: (message: Buffer) => Promise<Buffer>;
  validateSignature: (hash: Buffer, signature: Buffer, signer: string) => Promise<boolean>;
  ERRGENERIC: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERRImporterALREADYREGISTERED: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERRImporterNOTREGISTERED: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_EMPTY_HASH: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_EMPTY_SIGNATURE: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_INVALID_SIGNATURE: () => Promise<ClarityTypes.Response<null, bigint>>;
  VERSION: () => Promise<string>;
  importerStorageError: () => Promise<ClarityTypes.Response<null, bigint>>;
  messagePrefix: () => Promise<Buffer>;
  }