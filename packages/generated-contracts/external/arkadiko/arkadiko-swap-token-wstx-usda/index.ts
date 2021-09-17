

import { BaseProvider, Contract, proxy } from 'taral-shared';
import { ArkadikoSwapTokenWstxUsdaInterface } from './abi';
import type { ArkadikoSwapTokenWstxUsdaContract } from './types';
export type { ArkadikoSwapTokenWstxUsdaContract } from './types';

export const arkadikoSwapTokenWstxUsdaContract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoSwapTokenWstxUsdaContract>(ArkadikoSwapTokenWstxUsdaInterface, provider);
    return contract;
};

export const arkadikoSwapTokenWstxUsdaInfo: Contract<ArkadikoSwapTokenWstxUsdaContract> = {
    contract: arkadikoSwapTokenWstxUsdaContract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'C:\biz\taral/packages/clarity/contracts/external/arkadiko/arkadiko-swap-token-wstx-usda.clar',
};
