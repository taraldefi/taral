
  
  import { NodeContract, WebContract, nodeProxy, webProxy, BaseNodeProvider, BaseWebProvider } from 'lib-shared';
  import type { ArkadikoSwapTokenWstxUsdaContract } from './types';
  import { ArkadikoSwapTokenWstxUsdaInterface } from './abi';
  export type { ArkadikoSwapTokenWstxUsdaContract } from './types';

  export const nodeArkadikoSwapTokenWstxUsdaContract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<ArkadikoSwapTokenWstxUsdaContract>(ArkadikoSwapTokenWstxUsdaInterface, provider);
    return contract;
  };

  export const nodeArkadikoSwapTokenWstxUsdaInfo: NodeContract<ArkadikoSwapTokenWstxUsdaContract> = {
    contract: nodeArkadikoSwapTokenWstxUsdaContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-swap-token-wstx-usda.clar',
  };
  
  export const webArkadikoSwapTokenWstxUsdaContract = (provider: BaseWebProvider) => {
    const contract = webProxy<ArkadikoSwapTokenWstxUsdaContract>(ArkadikoSwapTokenWstxUsdaInterface, provider);
    return contract;
  };

  export const webArkadikoSwapTokenWstxUsdaInfo: WebContract<ArkadikoSwapTokenWstxUsdaContract> = {
    contract: webArkadikoSwapTokenWstxUsdaContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-swap-token-wstx-usda.clar',
  };