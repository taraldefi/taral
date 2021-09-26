
  
  import { Contract, proxy, BaseProvider } from 'lib-shared';
  import type { ArkadikoTokenContract } from './types';
  import { ArkadikoTokenInterface } from './abi';
  export type { ArkadikoTokenContract } from './types';

  export const arkadikoTokenContract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoTokenContract>(ArkadikoTokenInterface, provider);
    return contract;
  };

  export const arkadikoTokenInfo: Contract<ArkadikoTokenContract> = {
    contract: arkadikoTokenContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-token.clar',
  };