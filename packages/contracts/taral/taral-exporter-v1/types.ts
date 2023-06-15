
  
  import { Transaction } from 'lib-shared';
  import { ClarityTypes } from 'lib-shared'

  export interface TaralExporterV1Contract {
      appendOrder: (newOrderId: number | bigint, exporter: string) => Transaction<boolean, bigint>;
  register: (exporter: string, exporterName: string, exporterCategory: string) => Transaction<boolean, bigint>;
  getInfo: () => Promise<ClarityTypes.Response<{
  "version": string
    }, null>>;
  getVersion: () => Promise<string>;
  ERREXPORTERALREADYREGISTERED: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERREXPORTERNOTREGISTERED: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERRGENERIC: () => Promise<ClarityTypes.Response<null, bigint>>;
  VERSION: () => Promise<string>;
  exporterStorageError: () => Promise<ClarityTypes.Response<null, bigint>>;
  }