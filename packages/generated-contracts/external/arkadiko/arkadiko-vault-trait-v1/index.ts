
  
  import { Contract, proxy, BaseProvider } from 'lib-shared';
  import type { ArkadikoVaultTraitV1Contract } from './types';
  import { ArkadikoVaultTraitV1Interface } from './abi';
  export type { ArkadikoVaultTraitV1Contract } from './types';

  export const arkadikoVaultTraitV1Contract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoVaultTraitV1Contract>(ArkadikoVaultTraitV1Interface, provider);
    return contract;
  };

  export const arkadikoVaultTraitV1Info: Contract<ArkadikoVaultTraitV1Contract> = {
    contract: arkadikoVaultTraitV1Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-vault-trait-v1.clar',
  };