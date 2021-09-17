
  
  import { Contract, proxy, BaseProvider } from 'taral-shared';
  import type { ArkadikoSwapTokenDikoUsdaContract } from './types';
  import { ArkadikoSwapTokenDikoUsdaInterface } from './abi';
  export type { ArkadikoSwapTokenDikoUsdaContract } from './types';

  export const arkadikoSwapTokenDikoUsdaContract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoSwapTokenDikoUsdaContract>(ArkadikoSwapTokenDikoUsdaInterface, provider);
    return contract;
  };

  export const arkadikoSwapTokenDikoUsdaInfo: Contract<ArkadikoSwapTokenDikoUsdaContract> = {
    contract: arkadikoSwapTokenDikoUsdaContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'C:\biz\taral/packages/clarity/contracts/external/arkadiko/arkadiko-swap-token-diko-usda.clar',
  };