import { ClarityTypes, Transaction } from "lib-shared";

export interface TaralExporterContract {
  appendOrder: (
    newOrderId: number | bigint,
    exporter: string
  ) => Transaction<boolean, bigint>;
  register: (
    exporter: string,
    exporterName: string,
    exporterCategory: string
  ) => Transaction<boolean, bigint>;
  getExporterId: (exporter: string) => Promise<bigint | null>;
  getExporterOrder: (
    id: number | bigint,
    exporter: string
  ) => Promise<{
    orderId: bigint;
  } | null>;
  getExporterOrders: (
    ids: bigint[],
    principals: string[]
  ) => Promise<
    | {
        orderId: bigint;
      }
    | null[]
  >;
  getExporterProfile: (exporter: string) => Promise<{
    category: string;
    name: string;
    ordersNextAvailId: bigint;
  } | null>;
  getExporters: (principals: string[]) => Promise<
    | {
        category: string;
        name: string;
        ordersNextAvailId: bigint;
      }
    | null[]
  >;
  getNextExporterId: () => Promise<bigint>;
  ERREXPORTERALREADYREGISTERED: () => Promise<
    ClarityTypes.Response<null, bigint>
  >;
  ERREXPORTERNOTREGISTERED: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERRGENERIC: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERRPERMISSIONDENIED: () => Promise<ClarityTypes.Response<null, bigint>>;
  exporterIdNonce: () => Promise<bigint>;
  exporterByPrincipal: (key: string) => Promise<bigint | null>;
  exporterProfile: (key: { exporterId: bigint }) => Promise<{
    category: string;
    name: string;
    ordersNextAvailId: bigint;
  } | null>;
  orders: (key: { exporterId: bigint; id: bigint }) => Promise<{
    orderId: bigint;
  } | null>;
}
