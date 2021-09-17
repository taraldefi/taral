
  
  import { Contract, proxy, BaseProvider } from 'taral-shared';
  import type { ArkadikoVaultDataV11Contract } from './types';
  import { ArkadikoVaultDataV11Interface } from './abi';
  export type { ArkadikoVaultDataV11Contract } from './types';

  export const arkadikoVaultDataV11Contract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoVaultDataV11Contract>(ArkadikoVaultDataV11Interface, provider);
    return contract;
  };

  export const arkadikoVaultDataV11Info: Contract<ArkadikoVaultDataV11Contract> = {
    contract: arkadikoVaultDataV11Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'C:\biz\taral/packages/clarity/contracts/external/arkadiko/arkadiko-vault-data-v1-1.clar',
  };