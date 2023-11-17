
  
  import { NodeContract, WebContract, nodeProxy, webProxy, BaseNodeProvider, BaseWebProvider } from 'lib-shared';
  import type { StorageServiceTraitContract } from './types';
  import { StorageServiceTraitInterface } from './abi';
  export type { StorageServiceTraitContract } from './types';

  export const nodeStorageServiceTraitContract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<StorageServiceTraitContract>(StorageServiceTraitInterface, provider);
    return contract;
  };

  export const nodeStorageServiceTraitInfo: NodeContract<StorageServiceTraitContract> = {
    contract: nodeStorageServiceTraitContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/taral/storage-service-trait.clar',
  };
  
  export const webStorageServiceTraitContract = (provider: BaseWebProvider) => {
    const contract = webProxy<StorageServiceTraitContract>(StorageServiceTraitInterface, provider);
    return contract;
  };

  export const webStorageServiceTraitInfo: WebContract<StorageServiceTraitContract> = {
    contract: webStorageServiceTraitContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/taral/storage-service-trait.clar',
  };