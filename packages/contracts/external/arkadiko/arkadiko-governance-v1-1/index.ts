
  
  import { NodeContract, WebContract, nodeProxy, webProxy, BaseNodeProvider, BaseWebProvider } from 'lib-shared';
  import type { ArkadikoGovernanceV11Contract } from './types';
  import { ArkadikoGovernanceV11Interface } from './abi';
  export type { ArkadikoGovernanceV11Contract } from './types';

  export const nodeArkadikoGovernanceV11Contract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<ArkadikoGovernanceV11Contract>(ArkadikoGovernanceV11Interface, provider);
    return contract;
  };

  export const nodeArkadikoGovernanceV11Info: NodeContract<ArkadikoGovernanceV11Contract> = {
    contract: nodeArkadikoGovernanceV11Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-governance-v1-1.clar',
  };
  
  export const webArkadikoGovernanceV11Contract = (provider: BaseWebProvider) => {
    const contract = webProxy<ArkadikoGovernanceV11Contract>(ArkadikoGovernanceV11Interface, provider);
    return contract;
  };

  export const webArkadikoGovernanceV11Info: WebContract<ArkadikoGovernanceV11Contract> = {
    contract: webArkadikoGovernanceV11Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-governance-v1-1.clar',
  };