
  
  import { NodeContract, WebContract, nodeProxy, webProxy, BaseNodeProvider, BaseWebProvider } from 'lib-shared';
  import type { Sip009NftContract } from './types';
  import { Sip009NftInterface } from './abi';
  export type { Sip009NftContract } from './types';

  export const nodeSip009NftContract = (provider: BaseNodeProvider) => {
    const contract = nodeProxy<Sip009NftContract>(Sip009NftInterface, provider);
    return contract;
  };

  export const nodeSip009NftInfo: NodeContract<Sip009NftContract> = {
    contract: nodeSip009NftContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/taral/sip009-nft.clar',
  };
  
  export const webSip009NftContract = (provider: BaseWebProvider) => {
    const contract = webProxy<Sip009NftContract>(Sip009NftInterface, provider);
    return contract;
  };

  export const webSip009NftInfo: WebContract<Sip009NftContract> = {
    contract: webSip009NftContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/taral/sip009-nft.clar',
  };