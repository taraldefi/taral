
  
  import { Contract, proxy, BaseProvider } from 'lib-shared';
  import type { ArkadikoFreddieV11Contract } from './types';
  import { ArkadikoFreddieV11Interface } from './abi';
  export type { ArkadikoFreddieV11Contract } from './types';

  export const arkadikoFreddieV11Contract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoFreddieV11Contract>(ArkadikoFreddieV11Interface, provider);
    return contract;
  };

  export const arkadikoFreddieV11Info: Contract<ArkadikoFreddieV11Contract> = {
    contract: arkadikoFreddieV11Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-freddie-v1-1.clar',
  };