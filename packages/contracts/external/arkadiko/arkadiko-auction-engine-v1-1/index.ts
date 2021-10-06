
  
  import { NodeContract, WebContract, nodeProxy, webProxy, BaseNodeProvider, BaseWebProvider } from 'lib-shared';
  import type { ArkadikoAuctionEngineV11Contract } from './types';
  import { ArkadikoAuctionEngineV11Interface } from './abi';
  export type { ArkadikoAuctionEngineV11Contract } from './types';

  export const nodeArkadikoAuctionEngineV11Contract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<ArkadikoAuctionEngineV11Contract>(ArkadikoAuctionEngineV11Interface, provider);
    return contract;
  };

  export const nodeArkadikoAuctionEngineV11Info: NodeContract<ArkadikoAuctionEngineV11Contract> = {
    contract: nodeArkadikoAuctionEngineV11Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-auction-engine-v1-1.clar',
  };
  
  export const webArkadikoAuctionEngineV11Contract = (provider: BaseWebProvider) => {
    const contract = webProxy<ArkadikoAuctionEngineV11Contract>(ArkadikoAuctionEngineV11Interface, provider);
    return contract;
  };

  export const webArkadikoAuctionEngineV11Info: WebContract<ArkadikoAuctionEngineV11Contract> = {
    contract: webArkadikoAuctionEngineV11Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-auction-engine-v1-1.clar',
  };