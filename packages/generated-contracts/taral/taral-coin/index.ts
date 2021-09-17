
  
  import { Contract, proxy, BaseProvider } from 'taral-shared';
  import type { TaralCoinContract } from './types';
  import { TaralCoinInterface } from './abi';
  export type { TaralCoinContract } from './types';

  export const taralCoinContract = (provider: BaseProvider) => {
    const contract = proxy<TaralCoinContract>(TaralCoinInterface, provider);
    return contract;
  };

  export const taralCoinInfo: Contract<TaralCoinContract> = {
    contract: taralCoinContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'C:\biz\taral/packages/clarity/contracts/taral/taral-coin.clar',
  };