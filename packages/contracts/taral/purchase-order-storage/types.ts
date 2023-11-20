import { Transaction } from "lib-shared";
import { ClarityTypes } from "lib-shared";

export interface PurchaseOrderStorageContract {
  addOrder: (
    exporterId: number | bigint,
    importerId: number | bigint,
    orderHash: Buffer,
    paymentTerm: string,
    amount: number | bigint,
    deliveryTerm: string,
  ) => Transaction<boolean, null>;
  addOrderDetails: (orderDetailHash: Buffer) => Transaction<boolean, null>;
  deleteVault: (vaultId: number | bigint) => Transaction<boolean, null>;
  incrementOrderIdNonce: () => Transaction<boolean, null>;
  updateVault: (
    keyTuple: {
      "vault-id": bigint;
    },
    valueTuple: {
      borrower: string;
      "collateral-btc": bigint;
      "collateral-stx": bigint;
      debt: bigint;
      "last-repayment-date": bigint;
      "nft-id": bigint;
    },
  ) => Transaction<boolean, null>;
  getNextVaultId: () => Promise<bigint>;
  getOrderIdNonce: () => Promise<bigint>;
  getPurchaseOrder: (orderId: number | bigint) => Promise<{
    amount: bigint;
    "delivery-term": string;
    "exporter-id": bigint;
    hash: Buffer;
    "importer-id": bigint;
    "payment-term": string;
  } | null>;
  getPurchaseOrderDetail: (orderId: number | bigint) => Promise<{
    hash: Buffer;
  } | null>;
  getPurchaseOrders: (orderIds: bigint[]) => Promise<
    | {
        amount: bigint;
        "delivery-term": string;
        "exporter-id": bigint;
        hash: Buffer;
        "importer-id": bigint;
        "payment-term": string;
      }
    | null[]
  >;
  getVaultById: (vaultId: number | bigint) => Promise<{
    borrower: string;
    "collateral-btc": bigint;
    "collateral-stx": bigint;
    debt: bigint;
    "last-repayment-date": bigint;
    "nft-id": bigint;
  } | null>;
  lastVaultId: () => Promise<bigint>;
  orderIdNonce: () => Promise<bigint>;
  order: (key: { id: bigint }) => Promise<{
    amount: bigint;
    "delivery-term": string;
    "exporter-id": bigint;
    hash: Buffer;
    "importer-id": bigint;
    "payment-term": string;
  } | null>;
  orderDetail: (key: { id: bigint }) => Promise<{
    hash: Buffer;
  } | null>;
  vaults: (key: { "vault-id": bigint }) => Promise<{
    borrower: string;
    "collateral-btc": bigint;
    "collateral-stx": bigint;
    debt: bigint;
    "last-repayment-date": bigint;
    "nft-id": bigint;
  } | null>;
}
