
  
  import { NodeContract, WebContract, nodeProxy, webProxy, BaseNodeProvider, BaseWebProvider } from 'lib-shared';
  import type { BnsContract } from './types';
  import { BnsInterface } from './abi';
  export type { BnsContract } from './types';

  export const nodeBnsContract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<BnsContract>(BnsInterface, provider);
    return contract;
  };

  export const nodeBnsInfo: NodeContract<BnsContract> = {
    contract: nodeBnsContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/boot/bns.clar',
  };
  
  export const webBnsContract = (provider: BaseWebProvider) => {
    const contract = webProxy<BnsContract>(BnsInterface, provider);
    return contract;
  };

  export const webBnsInfo: WebContract<BnsContract> = {
    contract: webBnsContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/boot/bns.clar',
  };