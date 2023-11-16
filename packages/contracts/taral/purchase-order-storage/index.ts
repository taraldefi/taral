
  
  import { NodeContract, WebContract, nodeProxy, webProxy, BaseNodeProvider, BaseWebProvider } from 'lib-shared';
  import type { PurchaseOrderStorageContract } from './types';
  import { PurchaseOrderStorageInterface } from './abi';
  export type { PurchaseOrderStorageContract } from './types';

  export const nodePurchaseOrderStorageContract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<PurchaseOrderStorageContract>(PurchaseOrderStorageInterface, provider);
    return contract;
  };

  export const nodePurchaseOrderStorageInfo: NodeContract<PurchaseOrderStorageContract> = {
    contract: nodePurchaseOrderStorageContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/taral/purchase-order-storage.clar',
  };
  
  export const webPurchaseOrderStorageContract = (provider: BaseWebProvider) => {
    const contract = webProxy<PurchaseOrderStorageContract>(PurchaseOrderStorageInterface, provider);
    return contract;
  };

  export const webPurchaseOrderStorageInfo: WebContract<PurchaseOrderStorageContract> = {
    contract: webPurchaseOrderStorageContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/taral/purchase-order-storage.clar',
  };