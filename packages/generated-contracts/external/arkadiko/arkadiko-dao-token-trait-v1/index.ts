
  
  import { Contract, proxy, BaseProvider } from 'lib-shared';
  import type { ArkadikoDaoTokenTraitV1Contract } from './types';
  import { ArkadikoDaoTokenTraitV1Interface } from './abi';
  export type { ArkadikoDaoTokenTraitV1Contract } from './types';

  export const arkadikoDaoTokenTraitV1Contract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoDaoTokenTraitV1Contract>(ArkadikoDaoTokenTraitV1Interface, provider);
    return contract;
  };

  export const arkadikoDaoTokenTraitV1Info: Contract<ArkadikoDaoTokenTraitV1Contract> = {
    contract: arkadikoDaoTokenTraitV1Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-dao-token-trait-v1.clar',
  };