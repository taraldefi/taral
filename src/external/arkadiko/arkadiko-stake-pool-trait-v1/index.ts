
import { BaseProvider } from '../../../../shared/providers/base-provider';
import { proxy } from '../../../../shared/test-utils/proxy';
import { Contract } from '../../../../shared/types';
import { ArkadikoStakePoolTraitV1Interface } from './abi';
import type { ArkadikoStakePoolTraitV1Contract } from './types';


export type { ArkadikoStakePoolTraitV1Contract } from './types';

export const arkadikoStakePoolTraitV1Contract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoStakePoolTraitV1Contract>(ArkadikoStakePoolTraitV1Interface, provider);
    return contract;
};

export const arkadikoStakePoolTraitV1Info: Contract<ArkadikoStakePoolTraitV1Contract> = {
    contract: arkadikoStakePoolTraitV1Contract,
    address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
    contractFile: 'contracts/external/arkadiko/arkadiko-stake-pool-trait-v1.clar',
};
