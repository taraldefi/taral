import {
  NodeContract,
  WebContract,
  nodeProxy,
  webProxy,
  BaseNodeProvider,
  BaseWebProvider,
} from "lib-shared";
import type { MarketplaceStorageContract } from "./types";
import { MarketplaceStorageInterface } from "./abi";
export type { MarketplaceStorageContract } from "./types";

export const nodeMarketplaceStorageContract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<MarketplaceStorageContract>(
    MarketplaceStorageInterface,
    provider
  );
  return contract;
};

export const nodeMarketplaceStorageInfo: NodeContract<MarketplaceStorageContract> =
  {
    contract: nodeMarketplaceStorageContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile: "packages/clarity/contracts/taral/marketplace-storage.clar",
  };

export const webMarketplaceStorageContract = (provider: BaseWebProvider) => {
  const contract = webProxy<MarketplaceStorageContract>(
    MarketplaceStorageInterface,
    provider
  );
  return contract;
};

export const webMarketplaceStorageInfo: WebContract<MarketplaceStorageContract> =
  {
    contract: webMarketplaceStorageContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile: "packages/clarity/contracts/taral/marketplace-storage.clar",
  };
