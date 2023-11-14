
  
  import { NodeContract, WebContract, nodeProxy, webProxy, BaseNodeProvider, BaseWebProvider } from 'lib-shared';
  import type { NftMarketplaceContract } from './types';
  import { NftMarketplaceInterface } from './abi';
  export type { NftMarketplaceContract } from './types';

  export const nodeNftMarketplaceContract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<NftMarketplaceContract>(NftMarketplaceInterface, provider);
    return contract;
  };

  export const nodeNftMarketplaceInfo: NodeContract<NftMarketplaceContract> = {
    contract: nodeNftMarketplaceContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/taral/nft-marketplace.clar',
  };
  
  export const webNftMarketplaceContract = (provider: BaseWebProvider) => {
    const contract = webProxy<NftMarketplaceContract>(NftMarketplaceInterface, provider);
    return contract;
  };

  export const webNftMarketplaceInfo: WebContract<NftMarketplaceContract> = {
    contract: webNftMarketplaceContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/taral/nft-marketplace.clar',
  };