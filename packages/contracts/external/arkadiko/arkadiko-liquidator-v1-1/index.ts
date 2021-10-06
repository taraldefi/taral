
  
  import { NodeContract, WebContract, nodeProxy, webProxy, BaseNodeProvider, BaseWebProvider } from 'lib-shared';
  import type { ArkadikoLiquidatorV11Contract } from './types';
  import { ArkadikoLiquidatorV11Interface } from './abi';
  export type { ArkadikoLiquidatorV11Contract } from './types';

  export const nodeArkadikoLiquidatorV11Contract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<ArkadikoLiquidatorV11Contract>(ArkadikoLiquidatorV11Interface, provider);
    return contract;
  };

  export const nodeArkadikoLiquidatorV11Info: NodeContract<ArkadikoLiquidatorV11Contract> = {
    contract: nodeArkadikoLiquidatorV11Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-liquidator-v1-1.clar',
  };
  
  export const webArkadikoLiquidatorV11Contract = (provider: BaseWebProvider) => {
    const contract = webProxy<ArkadikoLiquidatorV11Contract>(ArkadikoLiquidatorV11Interface, provider);
    return contract;
  };

  export const webArkadikoLiquidatorV11Info: WebContract<ArkadikoLiquidatorV11Contract> = {
    contract: webArkadikoLiquidatorV11Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-liquidator-v1-1.clar',
  };