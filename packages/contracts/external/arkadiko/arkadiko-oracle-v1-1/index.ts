
  
  import { NodeContract, WebContract, nodeProxy, webProxy, BaseNodeProvider, BaseWebProvider } from 'lib-shared';
  import type { ArkadikoOracleV11Contract } from './types';
  import { ArkadikoOracleV11Interface } from './abi';
  export type { ArkadikoOracleV11Contract } from './types';

  export const nodeArkadikoOracleV11Contract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<ArkadikoOracleV11Contract>(ArkadikoOracleV11Interface, provider);
    return contract;
  };

  export const nodeArkadikoOracleV11Info: NodeContract<ArkadikoOracleV11Contract> = {
    contract: nodeArkadikoOracleV11Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-oracle-v1-1.clar',
  };
  
  export const webArkadikoOracleV11Contract = (provider: BaseWebProvider) => {
    const contract = webProxy<ArkadikoOracleV11Contract>(ArkadikoOracleV11Interface, provider);
    return contract;
  };

  export const webArkadikoOracleV11Info: WebContract<ArkadikoOracleV11Contract> = {
    contract: webArkadikoOracleV11Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-oracle-v1-1.clar',
  };