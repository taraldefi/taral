import { Transaction } from "lib-shared";
import { ClarityTypes } from "lib-shared";

export interface ExporterStorageContract {
  addExporter: (
    exporter: string,
    exporterId: number | bigint
  ) => Transaction<boolean, null>;
  addExporterProfile: (
    exporterId: number | bigint,
    exporterName: string,
    hash: Buffer,
    exporterCategory: string
  ) => Transaction<boolean, null>;
  addOrder: (
    id: number | bigint,
    exporterId: number | bigint,
    orderId: number | bigint
  ) => Transaction<boolean, null>;
  incrementExporterIdNonce: () => Transaction<boolean, null>;
  updateExporterProfile: (
    keyTuple: {
      "exporter-id": bigint;
    },
    valueTuple: {
      category: string;
      created: bigint;
      hash: Buffer;
      name: string;
      "orders-next-avail-id": bigint;
    }
  ) => Transaction<boolean, null>;
  getExporterByPrincipal: (exporter: string) => Promise<bigint | null>;
  getExporterIdNonce: () => Promise<bigint>;
  getExporterOrder: (
    id: number | bigint,
    exporter: string
  ) => Promise<{
    "order-id": bigint;
  } | null>;
  getExporterOrders: (
    ids: bigint[],
    principals: string[]
  ) => Promise<
    | {
        "order-id": bigint;
      }
    | null[]
  >;
  getExporterProfile: (exporter: string) => Promise<{
    category: string;
    created: bigint;
    hash: Buffer;
    name: string;
    "orders-next-avail-id": bigint;
  } | null>;
  getExporters: (principals: string[]) => Promise<
    | {
        category: string;
        created: bigint;
        hash: Buffer;
        name: string;
        "orders-next-avail-id": bigint;
      }
    | null[]
  >;
  getOrdersNextAvailId: (exporter: {
    category: string;
    created: bigint;
    hash: Buffer;
    name: string;
    "orders-next-avail-id": bigint;
  }) => Promise<bigint>;
  exporterIdNonce: () => Promise<bigint>;
  exporterByPrincipal: (key: string) => Promise<bigint | null>;
  exporterProfile: (key: { "exporter-id": bigint }) => Promise<{
    category: string;
    created: bigint;
    hash: Buffer;
    name: string;
    "orders-next-avail-id": bigint;
  } | null>;
  orders: (key: { "exporter-id": bigint; id: bigint }) => Promise<{
    "order-id": bigint;
  } | null>;
}
