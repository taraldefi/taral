
  
  import { NodeContract, WebContract, nodeProxy, webProxy, BaseNodeProvider, BaseWebProvider } from 'lib-shared';
  import type { TestUtilsContract } from './types';
  import { TestUtilsInterface } from './abi';
  export type { TestUtilsContract } from './types';

  export const nodeTestUtilsContract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<TestUtilsContract>(TestUtilsInterface, provider);
    return contract;
  };

  export const nodeTestUtilsInfo: NodeContract<TestUtilsContract> = {
    contract: nodeTestUtilsContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/test-utils/test-utils.clar',
  };
  
  export const webTestUtilsContract = (provider: BaseWebProvider) => {
    const contract = webProxy<TestUtilsContract>(TestUtilsInterface, provider);
    return contract;
  };

  export const webTestUtilsInfo: WebContract<TestUtilsContract> = {
    contract: webTestUtilsContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/test-utils/test-utils.clar',
  };