
import { BaseProvider } from '../../../../shared/providers/base-provider';
import { proxy } from '../../../../shared/test-utils/proxy';
import { Contract } from '../../../../shared/types';
import { ArkadikoStakePoolWstxUsdaV11Interface } from './abi';
import type { ArkadikoStakePoolWstxUsdaV11Contract } from './types';


export type { ArkadikoStakePoolWstxUsdaV11Contract } from './types';

export const arkadikoStakePoolWstxUsdaV11Contract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoStakePoolWstxUsdaV11Contract>(ArkadikoStakePoolWstxUsdaV11Interface, provider);
    return contract;
};

export const arkadikoStakePoolWstxUsdaV11Info: Contract<ArkadikoStakePoolWstxUsdaV11Contract> = {
    contract: arkadikoStakePoolWstxUsdaV11Contract,
    address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
    contractFile: 'contracts/external/arkadiko/arkadiko-stake-pool-wstx-usda-v1-1.clar',
};
