
  
  import { NodeContract, WebContract, nodeProxy, webProxy, BaseNodeProvider, BaseWebProvider } from 'lib-shared';
  import type { NftTraitContract } from './types';
  import { NftTraitInterface } from './abi';
  export type { NftTraitContract } from './types';

  export const nodeNftTraitContract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<NftTraitContract>(NftTraitInterface, provider);
    return contract;
  };

  export const nodeNftTraitInfo: NodeContract<NftTraitContract> = {
    contract: nodeNftTraitContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/taral/nft-trait.clar',
  };
  
  export const webNftTraitContract = (provider: BaseWebProvider) => {
    const contract = webProxy<NftTraitContract>(NftTraitInterface, provider);
    return contract;
  };

  export const webNftTraitInfo: WebContract<NftTraitContract> = {
    contract: webNftTraitContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/taral/nft-trait.clar',
  };