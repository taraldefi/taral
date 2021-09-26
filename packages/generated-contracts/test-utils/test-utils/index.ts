
  
  import { Contract, proxy, BaseProvider } from 'lib-shared';
  import type { TestUtilsContract } from './types';
  import { TestUtilsInterface } from './abi';
  export type { TestUtilsContract } from './types';

  export const testUtilsContract = (provider: BaseProvider) => {
    const contract = proxy<TestUtilsContract>(TestUtilsInterface, provider);
    return contract;
  };

  export const testUtilsInfo: Contract<TestUtilsContract> = {
    contract: testUtilsContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/test-utils/test-utils.clar',
  };