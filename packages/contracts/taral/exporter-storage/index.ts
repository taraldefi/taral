
  
  import { NodeContract, WebContract, nodeProxy, webProxy, BaseNodeProvider, BaseWebProvider } from 'lib-shared';
  import type { ExporterStorageContract } from './types';
  import { ExporterStorageInterface } from './abi';
  export type { ExporterStorageContract } from './types';

  export const nodeExporterStorageContract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<ExporterStorageContract>(ExporterStorageInterface, provider);
    return contract;
  };

  export const nodeExporterStorageInfo: NodeContract<ExporterStorageContract> = {
    contract: nodeExporterStorageContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/taral/exporter-storage.clar',
  };
  
  export const webExporterStorageContract = (provider: BaseWebProvider) => {
    const contract = webProxy<ExporterStorageContract>(ExporterStorageInterface, provider);
    return contract;
  };

  export const webExporterStorageInfo: WebContract<ExporterStorageContract> = {
    contract: webExporterStorageContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/taral/exporter-storage.clar',
  };