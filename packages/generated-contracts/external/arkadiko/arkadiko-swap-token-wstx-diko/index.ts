
  
  import { Contract, proxy, BaseProvider } from 'lib-shared';
  import type { ArkadikoSwapTokenWstxDikoContract } from './types';
  import { ArkadikoSwapTokenWstxDikoInterface } from './abi';
  export type { ArkadikoSwapTokenWstxDikoContract } from './types';

  export const arkadikoSwapTokenWstxDikoContract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoSwapTokenWstxDikoContract>(ArkadikoSwapTokenWstxDikoInterface, provider);
    return contract;
  };

  export const arkadikoSwapTokenWstxDikoInfo: Contract<ArkadikoSwapTokenWstxDikoContract> = {
    contract: arkadikoSwapTokenWstxDikoContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-swap-token-wstx-diko.clar',
  };