
  
  import { Contract, proxy, BaseProvider } from 'lib-shared';
  import type { ArkadikoStxReserveV11Contract } from './types';
  import { ArkadikoStxReserveV11Interface } from './abi';
  export type { ArkadikoStxReserveV11Contract } from './types';

  export const arkadikoStxReserveV11Contract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoStxReserveV11Contract>(ArkadikoStxReserveV11Interface, provider);
    return contract;
  };

  export const arkadikoStxReserveV11Info: Contract<ArkadikoStxReserveV11Contract> = {
    contract: arkadikoStxReserveV11Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-stx-reserve-v1-1.clar',
  };