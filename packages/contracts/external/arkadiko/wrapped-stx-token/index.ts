
  
  import { NodeContract, WebContract, nodeProxy, webProxy, BaseNodeProvider, BaseWebProvider } from 'lib-shared';
  import type { WrappedStxTokenContract } from './types';
  import { WrappedStxTokenInterface } from './abi';
  export type { WrappedStxTokenContract } from './types';

  export const nodeWrappedStxTokenContract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<WrappedStxTokenContract>(WrappedStxTokenInterface, provider);
    return contract;
  };

  export const nodeWrappedStxTokenInfo: NodeContract<WrappedStxTokenContract> = {
    contract: nodeWrappedStxTokenContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/wrapped-stx-token.clar',
  };
  
  export const webWrappedStxTokenContract = (provider: BaseWebProvider) => {
    const contract = webProxy<WrappedStxTokenContract>(WrappedStxTokenInterface, provider);
    return contract;
  };

  export const webWrappedStxTokenInfo: WebContract<WrappedStxTokenContract> = {
    contract: webWrappedStxTokenContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/wrapped-stx-token.clar',
  };