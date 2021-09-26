
  
  import { Contract, proxy, BaseProvider } from 'lib-shared';
  import type { ArkadikoGovernanceV11Contract } from './types';
  import { ArkadikoGovernanceV11Interface } from './abi';
  export type { ArkadikoGovernanceV11Contract } from './types';

  export const arkadikoGovernanceV11Contract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoGovernanceV11Contract>(ArkadikoGovernanceV11Interface, provider);
    return contract;
  };

  export const arkadikoGovernanceV11Info: Contract<ArkadikoGovernanceV11Contract> = {
    contract: arkadikoGovernanceV11Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-governance-v1-1.clar',
  };