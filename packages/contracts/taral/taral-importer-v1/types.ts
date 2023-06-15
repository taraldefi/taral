
  
  import { Transaction } from 'lib-shared';
  import { ClarityTypes } from 'lib-shared'

  export interface TaralImporterV1Contract {
      appendOrder: (newOrderId: number | bigint, importer: string) => Transaction<boolean, bigint>;
  register: (importer: string, importerName: string, importerCategory: string) => Transaction<boolean, bigint>;
  getInfo: () => Promise<ClarityTypes.Response<{
  "version": string
    }, null>>;
  getVersion: () => Promise<string>;
  ERRGENERIC: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERRIMPORTERALREADYREGISTERED: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERRIMPORTERNOTREGISTERED: () => Promise<ClarityTypes.Response<null, bigint>>;
  VERSION: () => Promise<string>;
  importerStorageError: () => Promise<ClarityTypes.Response<null, bigint>>;
  }