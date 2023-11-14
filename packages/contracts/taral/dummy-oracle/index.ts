
  
  import { NodeContract, WebContract, nodeProxy, webProxy, BaseNodeProvider, BaseWebProvider } from 'lib-shared';
  import type { DummyOracleContract } from './types';
  import { DummyOracleInterface } from './abi';
  export type { DummyOracleContract } from './types';

  export const nodeDummyOracleContract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<DummyOracleContract>(DummyOracleInterface, provider);
    return contract;
  };

  export const nodeDummyOracleInfo: NodeContract<DummyOracleContract> = {
    contract: nodeDummyOracleContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/taral/dummy-oracle.clar',
  };
  
  export const webDummyOracleContract = (provider: BaseWebProvider) => {
    const contract = webProxy<DummyOracleContract>(DummyOracleInterface, provider);
    return contract;
  };

  export const webDummyOracleInfo: WebContract<DummyOracleContract> = {
    contract: webDummyOracleContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/taral/dummy-oracle.clar',
  };