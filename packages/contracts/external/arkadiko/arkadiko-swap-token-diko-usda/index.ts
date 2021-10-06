
  
  import { NodeContract, WebContract, nodeProxy, webProxy, BaseNodeProvider, BaseWebProvider } from 'lib-shared';
  import type { ArkadikoSwapTokenDikoUsdaContract } from './types';
  import { ArkadikoSwapTokenDikoUsdaInterface } from './abi';
  export type { ArkadikoSwapTokenDikoUsdaContract } from './types';

  export const nodeArkadikoSwapTokenDikoUsdaContract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<ArkadikoSwapTokenDikoUsdaContract>(ArkadikoSwapTokenDikoUsdaInterface, provider);
    return contract;
  };

  export const nodeArkadikoSwapTokenDikoUsdaInfo: NodeContract<ArkadikoSwapTokenDikoUsdaContract> = {
    contract: nodeArkadikoSwapTokenDikoUsdaContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-swap-token-diko-usda.clar',
  };
  
  export const webArkadikoSwapTokenDikoUsdaContract = (provider: BaseWebProvider) => {
    const contract = webProxy<ArkadikoSwapTokenDikoUsdaContract>(ArkadikoSwapTokenDikoUsdaInterface, provider);
    return contract;
  };

  export const webArkadikoSwapTokenDikoUsdaInfo: WebContract<ArkadikoSwapTokenDikoUsdaContract> = {
    contract: webArkadikoSwapTokenDikoUsdaContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-swap-token-diko-usda.clar',
  };