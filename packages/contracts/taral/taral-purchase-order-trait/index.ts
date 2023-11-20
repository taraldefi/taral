import {
  NodeContract,
  WebContract,
  nodeProxy,
  webProxy,
  BaseNodeProvider,
  BaseWebProvider,
} from "lib-shared";
import type { TaralPurchaseOrderTraitContract } from "./types";
import { TaralPurchaseOrderTraitInterface } from "./abi";
export type { TaralPurchaseOrderTraitContract } from "./types";

export const nodeTaralPurchaseOrderTraitContract = (
  provider: BaseNodeProvider,
) => {
  const contract = nodeProxy<TaralPurchaseOrderTraitContract>(
    TaralPurchaseOrderTraitInterface,
    provider,
  );
  return contract;
};

export const nodeTaralPurchaseOrderTraitInfo: NodeContract<TaralPurchaseOrderTraitContract> =
  {
    contract: nodeTaralPurchaseOrderTraitContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/taral/taral-purchase-order-trait.clar",
  };

export const webTaralPurchaseOrderTraitContract = (
  provider: BaseWebProvider,
) => {
  const contract = webProxy<TaralPurchaseOrderTraitContract>(
    TaralPurchaseOrderTraitInterface,
    provider,
  );
  return contract;
};

export const webTaralPurchaseOrderTraitInfo: WebContract<TaralPurchaseOrderTraitContract> =
  {
    contract: webTaralPurchaseOrderTraitContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/taral/taral-purchase-order-trait.clar",
  };
