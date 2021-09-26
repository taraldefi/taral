
  
  import { Contract, proxy, BaseProvider } from 'lib-shared';
  import type { UsdaTokenContract } from './types';
  import { UsdaTokenInterface } from './abi';
  export type { UsdaTokenContract } from './types';

  export const usdaTokenContract = (provider: BaseProvider) => {
    const contract = proxy<UsdaTokenContract>(UsdaTokenInterface, provider);
    return contract;
  };

  export const usdaTokenInfo: Contract<UsdaTokenContract> = {
    contract: usdaTokenContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/usda-token.clar',
  };