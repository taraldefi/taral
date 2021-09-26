
  
  import { Contract, proxy, BaseProvider } from 'lib-shared';
  import type { StdikoTokenContract } from './types';
  import { StdikoTokenInterface } from './abi';
  export type { StdikoTokenContract } from './types';

  export const stdikoTokenContract = (provider: BaseProvider) => {
    const contract = proxy<StdikoTokenContract>(StdikoTokenInterface, provider);
    return contract;
  };

  export const stdikoTokenInfo: Contract<StdikoTokenContract> = {
    contract: stdikoTokenContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/stdiko-token.clar',
  };