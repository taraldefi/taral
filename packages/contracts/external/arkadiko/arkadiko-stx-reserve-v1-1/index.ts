
  
  import { NodeContract, WebContract, nodeProxy, webProxy, BaseNodeProvider, BaseWebProvider } from 'lib-shared';
  import type { ArkadikoStxReserveV11Contract } from './types';
  import { ArkadikoStxReserveV11Interface } from './abi';
  export type { ArkadikoStxReserveV11Contract } from './types';

  export const nodeArkadikoStxReserveV11Contract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<ArkadikoStxReserveV11Contract>(ArkadikoStxReserveV11Interface, provider);
    return contract;
  };

  export const nodeArkadikoStxReserveV11Info: NodeContract<ArkadikoStxReserveV11Contract> = {
    contract: nodeArkadikoStxReserveV11Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-stx-reserve-v1-1.clar',
  };
  
  export const webArkadikoStxReserveV11Contract = (provider: BaseWebProvider) => {
    const contract = webProxy<ArkadikoStxReserveV11Contract>(ArkadikoStxReserveV11Interface, provider);
    return contract;
  };

  export const webArkadikoStxReserveV11Info: WebContract<ArkadikoStxReserveV11Contract> = {
    contract: webArkadikoStxReserveV11Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-stx-reserve-v1-1.clar',
  };