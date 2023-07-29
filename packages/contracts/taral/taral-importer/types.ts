import { Transaction } from "lib-shared";
import { ClarityTypes } from "lib-shared";

export interface TaralImporterContract {
  appendOrder: (
    newOrderId: number | bigint,
    importer: string
  ) => Transaction<boolean, bigint>;
  register: (
    importer: string,
    importerName: string,
    importerCategory: string
  ) => Transaction<boolean, bigint>;
  getImporterId: (importer: string) => Promise<bigint | null>;
  getImporterOrder: (
    id: number | bigint,
    importer: string
  ) => Promise<{
    orderId: bigint;
  } | null>;
  getImporterOrders: (
    ids: bigint[],
    principals: string[]
  ) => Promise<
    | {
        orderId: bigint;
      }
    | null[]
  >;
  getImporterProfile: (importer: string) => Promise<{
    category: string;
    name: string;
    ordersNextAvailId: bigint;
  } | null>;
  getImporters: (principals: string[]) => Promise<
    | {
        category: string;
        name: string;
        ordersNextAvailId: bigint;
      }
    | null[]
  >;
  getNextImporterId: () => Promise<bigint>;
  ERRGENERIC: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERRIMPORTERALREADYREGISTERED: () => Promise<
    ClarityTypes.Response<null, bigint>
  >;
  ERRIMPORTERNOTREGISTERED: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERRPERMISSIONDENIED: () => Promise<ClarityTypes.Response<null, bigint>>;
  importerIdNonce: () => Promise<bigint>;
  importerByPrincipal: (key: string) => Promise<bigint | null>;
  importerProfile: (key: { importerId: bigint }) => Promise<{
    category: string;
    name: string;
    ordersNextAvailId: bigint;
  } | null>;
  orders: (key: { id: bigint; importerId: bigint }) => Promise<{
    orderId: bigint;
  } | null>;
}
