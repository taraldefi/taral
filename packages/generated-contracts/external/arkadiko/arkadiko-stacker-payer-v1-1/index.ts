
  
  import { Contract, proxy, BaseProvider } from 'lib-shared';
  import type { ArkadikoStackerPayerV11Contract } from './types';
  import { ArkadikoStackerPayerV11Interface } from './abi';
  export type { ArkadikoStackerPayerV11Contract } from './types';

  export const arkadikoStackerPayerV11Contract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoStackerPayerV11Contract>(ArkadikoStackerPayerV11Interface, provider);
    return contract;
  };

  export const arkadikoStackerPayerV11Info: Contract<ArkadikoStackerPayerV11Contract> = {
    contract: arkadikoStackerPayerV11Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-stacker-payer-v1-1.clar',
  };