
  
  import { NodeContract, WebContract, nodeProxy, webProxy, BaseNodeProvider, BaseWebProvider } from 'lib-shared';
  import type { StdikoTokenContract } from './types';
  import { StdikoTokenInterface } from './abi';
  export type { StdikoTokenContract } from './types';

  export const nodeStdikoTokenContract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<StdikoTokenContract>(StdikoTokenInterface, provider);
    return contract;
  };

  export const nodeStdikoTokenInfo: NodeContract<StdikoTokenContract> = {
    contract: nodeStdikoTokenContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/stdiko-token.clar',
  };
  
  export const webStdikoTokenContract = (provider: BaseWebProvider) => {
    const contract = webProxy<StdikoTokenContract>(StdikoTokenInterface, provider);
    return contract;
  };

  export const webStdikoTokenInfo: WebContract<StdikoTokenContract> = {
    contract: webStdikoTokenContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/stdiko-token.clar',
  };