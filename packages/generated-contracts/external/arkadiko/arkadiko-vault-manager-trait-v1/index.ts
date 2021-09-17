
  
  import { Contract, proxy, BaseProvider } from 'taral-shared';
  import type { ArkadikoVaultManagerTraitV1Contract } from './types';
  import { ArkadikoVaultManagerTraitV1Interface } from './abi';
  export type { ArkadikoVaultManagerTraitV1Contract } from './types';

  export const arkadikoVaultManagerTraitV1Contract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoVaultManagerTraitV1Contract>(ArkadikoVaultManagerTraitV1Interface, provider);
    return contract;
  };

  export const arkadikoVaultManagerTraitV1Info: Contract<ArkadikoVaultManagerTraitV1Contract> = {
    contract: arkadikoVaultManagerTraitV1Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'C:\biz\taral/packages/clarity/contracts/external/arkadiko/arkadiko-vault-manager-trait-v1.clar',
  };