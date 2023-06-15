
  
  import { Transaction } from 'lib-shared';
  import { ClarityTypes } from 'lib-shared'

  export interface TaralPurchaseOrderContract {
      checkIfUserHoldsTalToken: (user: string) => Transaction<boolean, null>;
  initialize: (exporter: string, importer: string, deliveryCountry: string, dispatchMethod: string, shipmentType: string, shippingRoute: string[], paymentTerm: string, items: {
  "description": string;
  "id": string;
  "quantity": bigint;
  "type": string;
  "unitPrice": bigint
    }[], amount: number | bigint, invoiceTerms: string) => Transaction<boolean, bigint>;
  getPurchaseOrder: (orderId: number | bigint) => Promise<{
  "amount": bigint;
  "deliveryCountry": string;
  "dispatchMethod": string;
  "exporterId": bigint;
  "importerId": bigint;
  "invoiceTerms": string;
  "paymentTerm": string;
  "shipmentType": string
    } | null>;
  getPurchaseOrderDetail: (orderId: number | bigint) => Promise<{
  "item": {
  "description": string;
  "id": string;
  "quantity": bigint;
  "type": string;
  "unitPrice": bigint
    }[];
  "shippingRoute": string[]
    } | null>;
  getPurchaseOrders: (orderIds: bigint[]) => Promise<{
  "amount": bigint;
  "deliveryCountry": string;
  "dispatchMethod": string;
  "exporterId": bigint;
  "importerId": bigint;
  "invoiceTerms": string;
  "paymentTerm": string;
  "shipmentType": string
    } | null[]>;
  ERREXPORTERNOTREGISTERED: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERRGENERIC: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERRIMPORTERNOTREGISTERED: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERRPERMISSIONDENIED: () => Promise<ClarityTypes.Response<null, bigint>>;
  orderIdNonce: () => Promise<bigint>;
  order: (key: {
  "id": bigint
    }) => Promise<{
  "amount": bigint;
  "deliveryCountry": string;
  "dispatchMethod": string;
  "exporterId": bigint;
  "importerId": bigint;
  "invoiceTerms": string;
  "paymentTerm": string;
  "shipmentType": string
    } | null>;
  orderDetail: (key: {
  "id": bigint
    }) => Promise<{
  "item": {
  "description": string;
  "id": string;
  "quantity": bigint;
  "type": string;
  "unitPrice": bigint
    }[];
  "shippingRoute": string[]
    } | null>;
  }