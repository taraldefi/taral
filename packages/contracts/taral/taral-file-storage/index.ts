import {
  NodeContract,
  WebContract,
  nodeProxy,
  webProxy,
  BaseNodeProvider,
  BaseWebProvider,
} from "lib-shared";
import type { TaralFileStorageContract } from "./types";
import { TaralFileStorageInterface } from "./abi";
export type { TaralFileStorageContract } from "./types";

export const nodeTaralFileStorageContract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<TaralFileStorageContract>(
    TaralFileStorageInterface,
    provider,
  );
  return contract;
};

export const nodeTaralFileStorageInfo: NodeContract<TaralFileStorageContract> =
  {
    contract: nodeTaralFileStorageContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile: "packages/clarity/contracts/taral/taral-file-storage.clar",
  };

export const webTaralFileStorageContract = (provider: BaseWebProvider) => {
  const contract = webProxy<TaralFileStorageContract>(
    TaralFileStorageInterface,
    provider,
  );
  return contract;
};

export const webTaralFileStorageInfo: WebContract<TaralFileStorageContract> = {
  contract: webTaralFileStorageContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/taral-file-storage.clar",
};
