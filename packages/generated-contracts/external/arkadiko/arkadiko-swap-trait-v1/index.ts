
  
  import { Contract, proxy, BaseProvider } from 'lib-shared';
  import type { ArkadikoSwapTraitV1Contract } from './types';
  import { ArkadikoSwapTraitV1Interface } from './abi';
  export type { ArkadikoSwapTraitV1Contract } from './types';

  export const arkadikoSwapTraitV1Contract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoSwapTraitV1Contract>(ArkadikoSwapTraitV1Interface, provider);
    return contract;
  };

  export const arkadikoSwapTraitV1Info: Contract<ArkadikoSwapTraitV1Contract> = {
    contract: arkadikoSwapTraitV1Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-swap-trait-v1.clar',
  };