

import { BaseProvider, Contract, proxy } from 'taral-shared';
import { XstxTokenInterface } from './abi';
import type { XstxTokenContract } from './types';
export type { XstxTokenContract } from './types';

export const xstxTokenContract = (provider: BaseProvider) => {
    const contract = proxy<XstxTokenContract>(XstxTokenInterface, provider);
    return contract;
};

export const xstxTokenInfo: Contract<XstxTokenContract> = {
    contract: xstxTokenContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'C:\biz\taral/packages/clarity/contracts/external/arkadiko/xstx-token.clar',
};
