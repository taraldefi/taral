
  
  import { Transaction } from 'lib-shared';
  import { ClarityTypes } from 'lib-shared'

  export interface ExporterStorageContract {
      addExporter: (exporter: string, exporterId: number | bigint) => Transaction<boolean, null>;
  addExporterProfile: (exporterId: number | bigint, hash: Buffer, exporterName: string, exporterCategory: string) => Transaction<boolean, null>;
  addOrder: (id: number | bigint, exporterId: number | bigint, hash: Buffer, orderId: number | bigint) => Transaction<boolean, null>;
  incrementExporterIdNonce: () => Transaction<boolean, null>;
  updateExporterProfile: (keyTuple: {
  "exporter-id": bigint;
  "hash": Buffer
    }, valueTuple: {
  "category": string;
  "created": bigint;
  "name": string;
  "orders-next-avail-id": bigint
    }) => Transaction<boolean, null>;
  getExporterByPrincipal: (exporter: string) => Promise<bigint | null>;
  getExporterIdNonce: () => Promise<bigint>;
  getExporterOrder: (id: number | bigint, exporter: string, hash: Buffer) => Promise<{
  "order-id": bigint
    } | null>;
  getExporterOrders: (ids: bigint[], principals: string[], hashes: Buffer[]) => Promise<{
  "order-id": bigint
    } | null[]>;
  getExporterProfile: (exporter: string, hash: Buffer) => Promise<{
  "category": string;
  "created": bigint;
  "name": string;
  "orders-next-avail-id": bigint
    } | null>;
  getExporters: (principals: string[], hashes: Buffer[]) => Promise<{
  "category": string;
  "created": bigint;
  "name": string;
  "orders-next-avail-id": bigint
    } | null[]>;
  getOrdersNextAvailId: (exporter: {
  "category": string;
  "created": bigint;
  "name": string;
  "orders-next-avail-id": bigint
    }) => Promise<bigint>;
  exporterIdNonce: () => Promise<bigint>;
  exporterByPrincipal: (key: string) => Promise<bigint | null>;
  exporterProfile: (key: {
  "exporter-id": bigint;
  "hash": Buffer
    }) => Promise<{
  "category": string;
  "created": bigint;
  "name": string;
  "orders-next-avail-id": bigint
    } | null>;
  orders: (key: {
  "exporter-id": bigint;
  "hash": Buffer;
  "id": bigint
    }) => Promise<{
  "order-id": bigint
    } | null>;
  }