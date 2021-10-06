
  
  import { NodeContract, WebContract, nodeProxy, webProxy, BaseNodeProvider, BaseWebProvider } from 'lib-shared';
  import type { ArkadikoDaoTokenTraitV1Contract } from './types';
  import { ArkadikoDaoTokenTraitV1Interface } from './abi';
  export type { ArkadikoDaoTokenTraitV1Contract } from './types';

  export const nodeArkadikoDaoTokenTraitV1Contract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<ArkadikoDaoTokenTraitV1Contract>(ArkadikoDaoTokenTraitV1Interface, provider);
    return contract;
  };

  export const nodeArkadikoDaoTokenTraitV1Info: NodeContract<ArkadikoDaoTokenTraitV1Contract> = {
    contract: nodeArkadikoDaoTokenTraitV1Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-dao-token-trait-v1.clar',
  };
  
  export const webArkadikoDaoTokenTraitV1Contract = (provider: BaseWebProvider) => {
    const contract = webProxy<ArkadikoDaoTokenTraitV1Contract>(ArkadikoDaoTokenTraitV1Interface, provider);
    return contract;
  };

  export const webArkadikoDaoTokenTraitV1Info: WebContract<ArkadikoDaoTokenTraitV1Contract> = {
    contract: webArkadikoDaoTokenTraitV1Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-dao-token-trait-v1.clar',
  };