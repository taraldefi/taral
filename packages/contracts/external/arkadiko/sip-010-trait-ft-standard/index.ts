
  
  import { NodeContract, WebContract, nodeProxy, webProxy, BaseNodeProvider, BaseWebProvider } from 'lib-shared';
  import type { Sip010TraitFtStandardContract } from './types';
  import { Sip010TraitFtStandardInterface } from './abi';
  export type { Sip010TraitFtStandardContract } from './types';

  export const nodeSip010TraitFtStandardContract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<Sip010TraitFtStandardContract>(Sip010TraitFtStandardInterface, provider);
    return contract;
  };

  export const nodeSip010TraitFtStandardInfo: NodeContract<Sip010TraitFtStandardContract> = {
    contract: nodeSip010TraitFtStandardContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/sip-010-trait-ft-standard.clar',
  };
  
  export const webSip010TraitFtStandardContract = (provider: BaseWebProvider) => {
    const contract = webProxy<Sip010TraitFtStandardContract>(Sip010TraitFtStandardInterface, provider);
    return contract;
  };

  export const webSip010TraitFtStandardInfo: WebContract<Sip010TraitFtStandardContract> = {
    contract: webSip010TraitFtStandardContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/sip-010-trait-ft-standard.clar',
  };