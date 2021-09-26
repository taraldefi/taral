
  
  import { Contract, proxy, BaseProvider } from 'lib-shared';
  import type { ArkadikoStakePoolDikoTraitV1Contract } from './types';
  import { ArkadikoStakePoolDikoTraitV1Interface } from './abi';
  export type { ArkadikoStakePoolDikoTraitV1Contract } from './types';

  export const arkadikoStakePoolDikoTraitV1Contract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoStakePoolDikoTraitV1Contract>(ArkadikoStakePoolDikoTraitV1Interface, provider);
    return contract;
  };

  export const arkadikoStakePoolDikoTraitV1Info: Contract<ArkadikoStakePoolDikoTraitV1Contract> = {
    contract: arkadikoStakePoolDikoTraitV1Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-stake-pool-diko-trait-v1.clar',
  };