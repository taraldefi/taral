
  
  import { NodeContract, WebContract, nodeProxy, webProxy, BaseNodeProvider, BaseWebProvider } from 'lib-shared';
  import type { ArkadikoStackerPayerV11Contract } from './types';
  import { ArkadikoStackerPayerV11Interface } from './abi';
  export type { ArkadikoStackerPayerV11Contract } from './types';

  export const nodeArkadikoStackerPayerV11Contract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<ArkadikoStackerPayerV11Contract>(ArkadikoStackerPayerV11Interface, provider);
    return contract;
  };

  export const nodeArkadikoStackerPayerV11Info: NodeContract<ArkadikoStackerPayerV11Contract> = {
    contract: nodeArkadikoStackerPayerV11Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-stacker-payer-v1-1.clar',
  };
  
  export const webArkadikoStackerPayerV11Contract = (provider: BaseWebProvider) => {
    const contract = webProxy<ArkadikoStackerPayerV11Contract>(ArkadikoStackerPayerV11Interface, provider);
    return contract;
  };

  export const webArkadikoStackerPayerV11Info: WebContract<ArkadikoStackerPayerV11Contract> = {
    contract: webArkadikoStackerPayerV11Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-stacker-payer-v1-1.clar',
  };