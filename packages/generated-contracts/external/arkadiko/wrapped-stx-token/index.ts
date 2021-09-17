

import { BaseProvider, Contract, proxy } from 'taral-shared';
import { WrappedStxTokenInterface } from './abi';
import type { WrappedStxTokenContract } from './types';
export type { WrappedStxTokenContract } from './types';

export const wrappedStxTokenContract = (provider: BaseProvider) => {
    const contract = proxy<WrappedStxTokenContract>(WrappedStxTokenInterface, provider);
    return contract;
};

export const wrappedStxTokenInfo: Contract<WrappedStxTokenContract> = {
    contract: wrappedStxTokenContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'C:\biz\taral/packages/clarity/contracts/external/arkadiko/wrapped-stx-token.clar',
};
