import {
  NodeContract,
  WebContract,
  nodeProxy,
  webProxy,
  BaseNodeProvider,
  BaseWebProvider,
} from "lib-shared";
import type { TaralPurchaseOrderV1Contract } from "./types";
import { TaralPurchaseOrderV1Interface } from "./abi";
export type { TaralPurchaseOrderV1Contract } from "./types";

export const nodeTaralPurchaseOrderV1Contract = (
  provider: BaseNodeProvider
) => {
  const contract = nodeProxy<TaralPurchaseOrderV1Contract>(
    TaralPurchaseOrderV1Interface,
    provider
  );
  return contract;
};

export const nodeTaralPurchaseOrderV1Info: NodeContract<TaralPurchaseOrderV1Contract> =
  {
    contract: nodeTaralPurchaseOrderV1Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/taral/taral-purchase-order-v1.clar",
  };

export const webTaralPurchaseOrderV1Contract = (provider: BaseWebProvider) => {
  const contract = webProxy<TaralPurchaseOrderV1Contract>(
    TaralPurchaseOrderV1Interface,
    provider
  );
  return contract;
};

export const webTaralPurchaseOrderV1Info: WebContract<TaralPurchaseOrderV1Contract> =
  {
    contract: webTaralPurchaseOrderV1Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/taral/taral-purchase-order-v1.clar",
  };
