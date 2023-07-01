
  
  import { Transaction } from 'lib-shared';
  import { ClarityTypes } from 'lib-shared'

  export interface TaralExporterV1Contract {
      appendOrder: (newOrderId: number | bigint, exporter: string, hash: Buffer, signature: Buffer) => Transaction<boolean, bigint>;
  register: (exporter: string, hash: Buffer, signature: Buffer, exporterName: string, exporterCategory: string) => Transaction<boolean, bigint>;
  getInfo: () => Promise<ClarityTypes.Response<{
  "version": string
    }, null>>;
  getVersion: () => Promise<string>;
  hashMessage: (message: Buffer) => Promise<Buffer>;
  validateSignature: (hash: Buffer, signature: Buffer, signer: string) => Promise<boolean>;
  ERREXPORTERALREADYREGISTERED: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERREXPORTERNOTREGISTERED: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERRGENERIC: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_EMPTY_HASH: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_EMPTY_SIGNATURE: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_INVALID_SIGNATURE: () => Promise<ClarityTypes.Response<null, bigint>>;
  VERSION: () => Promise<string>;
  exporterStorageError: () => Promise<ClarityTypes.Response<null, bigint>>;
  messagePrefix: () => Promise<Buffer>;
  }