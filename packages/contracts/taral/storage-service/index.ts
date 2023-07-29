import {
  NodeContract,
  WebContract,
  nodeProxy,
  webProxy,
  BaseNodeProvider,
  BaseWebProvider,
} from "lib-shared";
import type { StorageServiceContract } from "./types";
import { StorageServiceInterface } from "./abi";
export type { StorageServiceContract } from "./types";

export const nodeStorageServiceContract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<StorageServiceContract>(
    StorageServiceInterface,
    provider
  );
  return contract;
};

export const nodeStorageServiceInfo: NodeContract<StorageServiceContract> = {
  contract: nodeStorageServiceContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/storage-service.clar",
};

export const webStorageServiceContract = (provider: BaseWebProvider) => {
  const contract = webProxy<StorageServiceContract>(
    StorageServiceInterface,
    provider
  );
  return contract;
};

export const webStorageServiceInfo: WebContract<StorageServiceContract> = {
  contract: webStorageServiceContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/storage-service.clar",
};
