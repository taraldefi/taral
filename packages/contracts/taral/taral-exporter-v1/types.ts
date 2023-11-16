
  
  import { Transaction } from 'lib-shared';
  import { ClarityTypes } from 'lib-shared'

  export interface TaralExporterV1Contract {
      appendOrder: (newOrderId: number | bigint, exporter: string) => Transaction<bigint, bigint>;
  register: (exporter: string, exporterName: string, hash: Buffer, exporterCategory: string) => Transaction<bigint, bigint>;
  updateExporterTrackRecord: (exporterPrincipal: string, success: boolean) => Transaction<boolean, bigint>;
  getExporterHash: (exporter: string) => Promise<ClarityTypes.Response<Buffer, bigint>>;
  getInfo: () => Promise<ClarityTypes.Response<{
  "version": string
    }, null>>;
  getVersion: () => Promise<string>;
  ERREXPORTERALREADYREGISTERED: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERREXPORTERNOTREGISTERED: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERRGENERIC: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_EMPTY_HASH: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_EMPTY_SIGNATURE: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_INVALID_SIGNATURE: () => Promise<ClarityTypes.Response<null, bigint>>;
  VERSION: () => Promise<string>;
  exporterStorageError: () => Promise<ClarityTypes.Response<null, bigint>>;
  }