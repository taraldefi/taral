import {
  BaseNodeProvider,
  BaseWebProvider,
  NodeContract,
  nodeProxy,
  WebContract,
  webProxy,
} from "lib-shared";
import { TaralStorageInterface } from "./abi";
import type { TaralStorageContract } from "./types";
export type { TaralStorageContract } from "./types";

export const nodeTaralStorageContract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<TaralStorageContract>(
    TaralStorageInterface,
    provider
  );
  return contract;
};

export const nodeTaralStorageInfo: NodeContract<TaralStorageContract> = {
  contract: nodeTaralStorageContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/taral-storage.clar",
};

export const webTaralStorageContract = (provider: BaseWebProvider) => {
  const contract = webProxy<TaralStorageContract>(
    TaralStorageInterface,
    provider
  );
  return contract;
};

export const webTaralStorageInfo: WebContract<TaralStorageContract> = {
  contract: webTaralStorageContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/taral-storage.clar",
};
