
  
  import { Contract, proxy, BaseProvider } from 'taral-shared';
  import type { ArkadikoDikoInitContract } from './types';
  import { ArkadikoDikoInitInterface } from './abi';
  export type { ArkadikoDikoInitContract } from './types';

  export const arkadikoDikoInitContract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoDikoInitContract>(ArkadikoDikoInitInterface, provider);
    return contract;
  };

  export const arkadikoDikoInitInfo: Contract<ArkadikoDikoInitContract> = {
    contract: arkadikoDikoInitContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'C:\biz\taral/packages/clarity/contracts/external/arkadiko/arkadiko-diko-init.clar',
  };