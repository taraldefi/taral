
  
  import { NodeContract, WebContract, nodeProxy, webProxy, BaseNodeProvider, BaseWebProvider } from 'lib-shared';
  import type { ArkadikoDikoInitContract } from './types';
  import { ArkadikoDikoInitInterface } from './abi';
  export type { ArkadikoDikoInitContract } from './types';

  export const nodeArkadikoDikoInitContract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<ArkadikoDikoInitContract>(ArkadikoDikoInitInterface, provider);
    return contract;
  };

  export const nodeArkadikoDikoInitInfo: NodeContract<ArkadikoDikoInitContract> = {
    contract: nodeArkadikoDikoInitContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-diko-init.clar',
  };
  
  export const webArkadikoDikoInitContract = (provider: BaseWebProvider) => {
    const contract = webProxy<ArkadikoDikoInitContract>(ArkadikoDikoInitInterface, provider);
    return contract;
  };

  export const webArkadikoDikoInitInfo: WebContract<ArkadikoDikoInitContract> = {
    contract: webArkadikoDikoInitContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-diko-init.clar',
  };