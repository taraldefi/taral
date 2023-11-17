import {
  NodeContract,
  WebContract,
  nodeProxy,
  webProxy,
  BaseNodeProvider,
  BaseWebProvider,
} from "lib-shared";
import type { TaralPurchaseOrderContract } from "./types";
import { TaralPurchaseOrderInterface } from "./abi";
export type { TaralPurchaseOrderContract } from "./types";

export const nodeTaralPurchaseOrderContract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<TaralPurchaseOrderContract>(
    TaralPurchaseOrderInterface,
    provider,
  );
  return contract;
};

export const nodeTaralPurchaseOrderInfo: NodeContract<TaralPurchaseOrderContract> =
  {
    contract: nodeTaralPurchaseOrderContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile: "packages/clarity/contracts/taral/taral-purchase-order.clar",
  };

export const webTaralPurchaseOrderContract = (provider: BaseWebProvider) => {
  const contract = webProxy<TaralPurchaseOrderContract>(
    TaralPurchaseOrderInterface,
    provider,
  );
  return contract;
};

export const webTaralPurchaseOrderInfo: WebContract<TaralPurchaseOrderContract> =
  {
    contract: webTaralPurchaseOrderContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile: "packages/clarity/contracts/taral/taral-purchase-order.clar",
  };
