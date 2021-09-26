
  
  import { Contract, proxy, BaseProvider } from 'lib-shared';
  import type { BnsContract } from './types';
  import { BnsInterface } from './abi';
  export type { BnsContract } from './types';

  export const bnsContract = (provider: BaseProvider) => {
    const contract = proxy<BnsContract>(BnsInterface, provider);
    return contract;
  };

  export const bnsInfo: Contract<BnsContract> = {
    contract: bnsContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/boot/bns.clar',
  };