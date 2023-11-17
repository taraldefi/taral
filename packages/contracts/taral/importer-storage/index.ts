
  
  import { NodeContract, WebContract, nodeProxy, webProxy, BaseNodeProvider, BaseWebProvider } from 'lib-shared';
  import type { ImporterStorageContract } from './types';
  import { ImporterStorageInterface } from './abi';
  export type { ImporterStorageContract } from './types';

  export const nodeImporterStorageContract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<ImporterStorageContract>(ImporterStorageInterface, provider);
    return contract;
  };

  export const nodeImporterStorageInfo: NodeContract<ImporterStorageContract> = {
    contract: nodeImporterStorageContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/taral/importer-storage.clar',
  };
  
  export const webImporterStorageContract = (provider: BaseWebProvider) => {
    const contract = webProxy<ImporterStorageContract>(ImporterStorageInterface, provider);
    return contract;
  };

  export const webImporterStorageInfo: WebContract<ImporterStorageContract> = {
    contract: webImporterStorageContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/taral/importer-storage.clar',
  };