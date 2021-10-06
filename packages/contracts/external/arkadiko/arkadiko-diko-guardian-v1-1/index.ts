
  
  import { NodeContract, WebContract, nodeProxy, webProxy, BaseNodeProvider, BaseWebProvider } from 'lib-shared';
  import type { ArkadikoDikoGuardianV11Contract } from './types';
  import { ArkadikoDikoGuardianV11Interface } from './abi';
  export type { ArkadikoDikoGuardianV11Contract } from './types';

  export const nodeArkadikoDikoGuardianV11Contract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<ArkadikoDikoGuardianV11Contract>(ArkadikoDikoGuardianV11Interface, provider);
    return contract;
  };

  export const nodeArkadikoDikoGuardianV11Info: NodeContract<ArkadikoDikoGuardianV11Contract> = {
    contract: nodeArkadikoDikoGuardianV11Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-diko-guardian-v1-1.clar',
  };
  
  export const webArkadikoDikoGuardianV11Contract = (provider: BaseWebProvider) => {
    const contract = webProxy<ArkadikoDikoGuardianV11Contract>(ArkadikoDikoGuardianV11Interface, provider);
    return contract;
  };

  export const webArkadikoDikoGuardianV11Info: WebContract<ArkadikoDikoGuardianV11Contract> = {
    contract: webArkadikoDikoGuardianV11Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-diko-guardian-v1-1.clar',
  };