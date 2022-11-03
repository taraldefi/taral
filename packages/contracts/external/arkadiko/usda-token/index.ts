
  
  import { NodeContract, WebContract, nodeProxy, webProxy, BaseNodeProvider, BaseWebProvider } from 'lib-shared';
  import type { UsdaTokenContract } from './types';
  import { UsdaTokenInterface } from './abi';
  export type { UsdaTokenContract } from './types';

  export const nodeUsdaTokenContract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<UsdaTokenContract>(UsdaTokenInterface, provider);
    return contract;
  };

  export const nodeUsdaTokenInfo: NodeContract<UsdaTokenContract> = {
    contract: nodeUsdaTokenContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/usda-token.clar',
  };
  
  export const webUsdaTokenContract = (provider: BaseWebProvider) => {
    const contract = webProxy<UsdaTokenContract>(UsdaTokenInterface, provider);
    return contract;
  };

  export const webUsdaTokenInfo: WebContract<UsdaTokenContract> = {
    contract: webUsdaTokenContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/usda-token.clar',
  };