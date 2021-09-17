
  
  import { Contract, proxy, BaseProvider } from 'taral-shared';
  import type { ArkadikoVaultRewardsV11Contract } from './types';
  import { ArkadikoVaultRewardsV11Interface } from './abi';
  export type { ArkadikoVaultRewardsV11Contract } from './types';

  export const arkadikoVaultRewardsV11Contract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoVaultRewardsV11Contract>(ArkadikoVaultRewardsV11Interface, provider);
    return contract;
  };

  export const arkadikoVaultRewardsV11Info: Contract<ArkadikoVaultRewardsV11Contract> = {
    contract: arkadikoVaultRewardsV11Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'C:\biz\taral/packages/clarity/contracts/external/arkadiko/arkadiko-vault-rewards-v1-1.clar',
  };