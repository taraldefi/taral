import {
  NodeContract,
  WebContract,
  nodeProxy,
  webProxy,
  BaseNodeProvider,
  BaseWebProvider,
} from "lib-shared";
import type { MarketplaceTraitContract } from "./types";
import { MarketplaceTraitInterface } from "./abi";
export type { MarketplaceTraitContract } from "./types";

export const nodeMarketplaceTraitContract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<MarketplaceTraitContract>(
    MarketplaceTraitInterface,
    provider
  );
  return contract;
};

export const nodeMarketplaceTraitInfo: NodeContract<MarketplaceTraitContract> =
  {
    contract: nodeMarketplaceTraitContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile: "packages/clarity/contracts/taral/marketplace-trait.clar",
  };

export const webMarketplaceTraitContract = (provider: BaseWebProvider) => {
  const contract = webProxy<MarketplaceTraitContract>(
    MarketplaceTraitInterface,
    provider
  );
  return contract;
};

export const webMarketplaceTraitInfo: WebContract<MarketplaceTraitContract> = {
  contract: webMarketplaceTraitContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/marketplace-trait.clar",
};
