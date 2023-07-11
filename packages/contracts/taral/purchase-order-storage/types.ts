
  
  import { Transaction } from 'lib-shared';
  import { ClarityTypes } from 'lib-shared'

  export interface PurchaseOrderStorageContract {
      addOrder: (exporterId: number | bigint, importerId: number | bigint, orderHash: Buffer, paymentTerm: string, amount: number | bigint, invoiceTerm: string) => Transaction<boolean, null>;
  addOrderDetails: (orderDetailHash: Buffer) => Transaction<boolean, null>;
  incrementOrderIdNonce: () => Transaction<boolean, null>;
  getOrderIdNonce: () => Promise<bigint>;
  getPurchaseOrder: (orderId: number | bigint) => Promise<{
  "amount": bigint;
  "exporter-id": bigint;
  "hash": Buffer;
  "importer-id": bigint;
  "invoice-term": string;
  "payment-term": string
    } | null>;
  getPurchaseOrderDetail: (orderId: number | bigint) => Promise<{
  "hash": Buffer
    } | null>;
  getPurchaseOrders: (orderIds: bigint[]) => Promise<{
  "amount": bigint;
  "exporter-id": bigint;
  "hash": Buffer;
  "importer-id": bigint;
  "invoice-term": string;
  "payment-term": string
    } | null[]>;
  orderIdNonce: () => Promise<bigint>;
  order: (key: {
  "id": bigint
    }) => Promise<{
  "amount": bigint;
  "exporter-id": bigint;
  "hash": Buffer;
  "importer-id": bigint;
  "invoice-term": string;
  "payment-term": string
    } | null>;
  orderDetail: (key: {
  "id": bigint
    }) => Promise<{
  "hash": Buffer
    } | null>;
  }