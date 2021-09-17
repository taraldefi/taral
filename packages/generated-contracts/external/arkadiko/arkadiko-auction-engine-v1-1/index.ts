

import { BaseProvider, Contract, proxy } from 'taral-shared';
import { ArkadikoAuctionEngineV11Interface } from './abi';
import type { ArkadikoAuctionEngineV11Contract } from './types';
export type { ArkadikoAuctionEngineV11Contract } from './types';

export const arkadikoAuctionEngineV11Contract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoAuctionEngineV11Contract>(ArkadikoAuctionEngineV11Interface, provider);
    return contract;
};

export const arkadikoAuctionEngineV11Info: Contract<ArkadikoAuctionEngineV11Contract> = {
    contract: arkadikoAuctionEngineV11Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'C:\biz\taral/packages/clarity/contracts/external/arkadiko/arkadiko-auction-engine-v1-1.clar',
};
