
  
  import { Transaction } from 'lib-shared';
  import { ClarityTypes } from 'lib-shared'

  export interface ImporterStorageContract {
      addImporter: (importer: string, importerId: number | bigint) => Transaction<boolean, null>;
  addImporterProfile: (importerId: number | bigint, importerName: string, hash: Buffer, importerCategory: string) => Transaction<boolean, null>;
  addOrder: (id: number | bigint, importerId: number | bigint, orderId: number | bigint) => Transaction<boolean, null>;
  incrementImporterIdNonce: () => Transaction<boolean, null>;
  updateImporterProfile: (keyTuple: {
  "importer-id": bigint
    }, valueTuple: {
  "category": string;
  "created": bigint;
  "hash": Buffer;
  "name": string;
  "orders-next-avail-id": bigint
    }) => Transaction<boolean, null>;
  getImporterByPrincipal: (importer: string) => Promise<bigint | null>;
  getImporterIdNonce: () => Promise<bigint>;
  getImporterOrder: (id: number | bigint, importer: string) => Promise<{
  "order-id": bigint
    } | null>;
  getImporterOrders: (ids: bigint[], principals: string[]) => Promise<{
  "order-id": bigint
    } | null[]>;
  getImporterProfile: (importer: string) => Promise<{
  "category": string;
  "created": bigint;
  "hash": Buffer;
  "name": string;
  "orders-next-avail-id": bigint
    } | null>;
  getImporters: (principals: string[]) => Promise<{
  "category": string;
  "created": bigint;
  "hash": Buffer;
  "name": string;
  "orders-next-avail-id": bigint
    } | null[]>;
  getOrdersNextAvailId: (importer: {
  "category": string;
  "created": bigint;
  "hash": Buffer;
  "name": string;
  "orders-next-avail-id": bigint
    }) => Promise<bigint>;
  importerIdNonce: () => Promise<bigint>;
  importerByPrincipal: (key: string) => Promise<bigint | null>;
  importerProfile: (key: {
  "importer-id": bigint
    }) => Promise<{
  "category": string;
  "created": bigint;
  "hash": Buffer;
  "name": string;
  "orders-next-avail-id": bigint
    } | null>;
  orders: (key: {
  "id": bigint;
  "importer-id": bigint
    }) => Promise<{
  "order-id": bigint
    } | null>;
  }