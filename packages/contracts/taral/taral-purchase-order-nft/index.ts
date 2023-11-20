import {
  NodeContract,
  WebContract,
  nodeProxy,
  webProxy,
  BaseNodeProvider,
  BaseWebProvider,
} from "lib-shared";
import type { TaralPurchaseOrderNftContract } from "./types";
import { TaralPurchaseOrderNftInterface } from "./abi";
export type { TaralPurchaseOrderNftContract } from "./types";

export const nodeTaralPurchaseOrderNftContract = (
  provider: BaseNodeProvider,
) => {
  const contract = nodeProxy<TaralPurchaseOrderNftContract>(
    TaralPurchaseOrderNftInterface,
    provider,
  );
  return contract;
};

export const nodeTaralPurchaseOrderNftInfo: NodeContract<TaralPurchaseOrderNftContract> =
  {
    contract: nodeTaralPurchaseOrderNftContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/taral/taral-purchase-order-nft.clar",
  };

export const webTaralPurchaseOrderNftContract = (provider: BaseWebProvider) => {
  const contract = webProxy<TaralPurchaseOrderNftContract>(
    TaralPurchaseOrderNftInterface,
    provider,
  );
  return contract;
};

export const webTaralPurchaseOrderNftInfo: WebContract<TaralPurchaseOrderNftContract> =
  {
    contract: webTaralPurchaseOrderNftContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/taral/taral-purchase-order-nft.clar",
  };
