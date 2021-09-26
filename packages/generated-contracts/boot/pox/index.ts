
  
  import { Contract, proxy, BaseProvider } from 'lib-shared';
  import type { PoxContract } from './types';
  import { PoxInterface } from './abi';
  export type { PoxContract } from './types';

  export const poxContract = (provider: BaseProvider) => {
    const contract = proxy<PoxContract>(PoxInterface, provider);
    return contract;
  };

  export const poxInfo: Contract<PoxContract> = {
    contract: poxContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/boot/pox.clar',
  };