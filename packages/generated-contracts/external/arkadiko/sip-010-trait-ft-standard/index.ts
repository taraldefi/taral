
  
  import { Contract, proxy, BaseProvider } from 'lib-shared';
  import type { Sip010TraitFtStandardContract } from './types';
  import { Sip010TraitFtStandardInterface } from './abi';
  export type { Sip010TraitFtStandardContract } from './types';

  export const sip010TraitFtStandardContract = (provider: BaseProvider) => {
    const contract = proxy<Sip010TraitFtStandardContract>(Sip010TraitFtStandardInterface, provider);
    return contract;
  };

  export const sip010TraitFtStandardInfo: Contract<Sip010TraitFtStandardContract> = {
    contract: sip010TraitFtStandardContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/sip-010-trait-ft-standard.clar',
  };