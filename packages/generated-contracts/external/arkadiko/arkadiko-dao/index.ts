
  
  import { Contract, proxy, BaseProvider } from 'taral-shared';
  import type { ArkadikoDaoContract } from './types';
  import { ArkadikoDaoInterface } from './abi';
  export type { ArkadikoDaoContract } from './types';

  export const arkadikoDaoContract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoDaoContract>(ArkadikoDaoInterface, provider);
    return contract;
  };

  export const arkadikoDaoInfo: Contract<ArkadikoDaoContract> = {
    contract: arkadikoDaoContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'C:\biz\taral/packages/clarity/contracts/external/arkadiko/arkadiko-dao.clar',
  };