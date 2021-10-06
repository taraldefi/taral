
  
  import { NodeContract, WebContract, nodeProxy, webProxy, BaseNodeProvider, BaseWebProvider } from 'lib-shared';
  import type { ArkadikoTokenContract } from './types';
  import { ArkadikoTokenInterface } from './abi';
  export type { ArkadikoTokenContract } from './types';

  export const nodeArkadikoTokenContract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<ArkadikoTokenContract>(ArkadikoTokenInterface, provider);
    return contract;
  };

  export const nodeArkadikoTokenInfo: NodeContract<ArkadikoTokenContract> = {
    contract: nodeArkadikoTokenContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-token.clar',
  };
  
  export const webArkadikoTokenContract = (provider: BaseWebProvider) => {
    const contract = webProxy<ArkadikoTokenContract>(ArkadikoTokenInterface, provider);
    return contract;
  };

  export const webArkadikoTokenInfo: WebContract<ArkadikoTokenContract> = {
    contract: webArkadikoTokenContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-token.clar',
  };