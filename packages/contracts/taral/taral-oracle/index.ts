
  
  import { NodeContract, WebContract, nodeProxy, webProxy, BaseNodeProvider, BaseWebProvider } from 'lib-shared';
  import type { TaralOracleContract } from './types';
  import { TaralOracleInterface } from './abi';
  export type { TaralOracleContract } from './types';

  export const nodeTaralOracleContract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<TaralOracleContract>(TaralOracleInterface, provider);
    return contract;
  };

  export const nodeTaralOracleInfo: NodeContract<TaralOracleContract> = {
    contract: nodeTaralOracleContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/taral/taral-oracle.clar',
  };
  
  export const webTaralOracleContract = (provider: BaseWebProvider) => {
    const contract = webProxy<TaralOracleContract>(TaralOracleInterface, provider);
    return contract;
  };

  export const webTaralOracleInfo: WebContract<TaralOracleContract> = {
    contract: webTaralOracleContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/taral/taral-oracle.clar',
  };