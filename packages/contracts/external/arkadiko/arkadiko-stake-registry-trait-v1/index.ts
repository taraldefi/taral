
  
  import { NodeContract, WebContract, nodeProxy, webProxy, BaseNodeProvider, BaseWebProvider } from 'lib-shared';
  import type { ArkadikoStakeRegistryTraitV1Contract } from './types';
  import { ArkadikoStakeRegistryTraitV1Interface } from './abi';
  export type { ArkadikoStakeRegistryTraitV1Contract } from './types';

  export const nodeArkadikoStakeRegistryTraitV1Contract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<ArkadikoStakeRegistryTraitV1Contract>(ArkadikoStakeRegistryTraitV1Interface, provider);
    return contract;
  };

  export const nodeArkadikoStakeRegistryTraitV1Info: NodeContract<ArkadikoStakeRegistryTraitV1Contract> = {
    contract: nodeArkadikoStakeRegistryTraitV1Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-stake-registry-trait-v1.clar',
  };
  
  export const webArkadikoStakeRegistryTraitV1Contract = (provider: BaseWebProvider) => {
    const contract = webProxy<ArkadikoStakeRegistryTraitV1Contract>(ArkadikoStakeRegistryTraitV1Interface, provider);
    return contract;
  };

  export const webArkadikoStakeRegistryTraitV1Info: WebContract<ArkadikoStakeRegistryTraitV1Contract> = {
    contract: webArkadikoStakeRegistryTraitV1Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-stake-registry-trait-v1.clar',
  };