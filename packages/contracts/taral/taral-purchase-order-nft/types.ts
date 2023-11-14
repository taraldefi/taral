
  
  import { Transaction } from 'lib-shared';
  import { ClarityTypes } from 'lib-shared'

  export interface TaralPurchaseOrderNftContract {
      burn: (tokenId: number | bigint, sender: string) => Transaction<boolean, bigint>;
  mint: (tokenId: number | bigint, receiver: string) => Transaction<boolean, bigint>;
  setTokenUri: (tokenId: number | bigint, value: string) => Transaction<boolean, bigint>;
  transfer: (tokenId: number | bigint, sender: string, receiver: string) => Transaction<boolean, bigint>;
  getLastTokenId: () => Promise<ClarityTypes.Response<bigint, null>>;
  getOwner: (id: number | bigint) => Promise<ClarityTypes.Response<string | null, null>>;
  getTokenUri: (tokenId: number | bigint) => Promise<ClarityTypes.Response<string | null, null>>;
  ERRNOTTOKENOWNER: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERROWNERONLY: () => Promise<ClarityTypes.Response<null, bigint>>;
  contractOwner: () => Promise<string>;
  mintPrice: () => Promise<bigint>;
  lastTokenId: () => Promise<bigint>;
  tokenUris: (key: bigint) => Promise<string | null>;
  }