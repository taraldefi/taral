
import { BaseProvider } from '../../../../shared/providers/base-provider';
import { proxy } from '../../../../shared/test-utils/proxy';
import { Contract } from '../../../../shared/types';
import { ArkadikoStakeRegistryTraitV1Interface } from './abi';
import type { ArkadikoStakeRegistryTraitV1Contract } from './types';


export type { ArkadikoStakeRegistryTraitV1Contract } from './types';

export const arkadikoStakeRegistryTraitV1Contract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoStakeRegistryTraitV1Contract>(ArkadikoStakeRegistryTraitV1Interface, provider);
    return contract;
};

export const arkadikoStakeRegistryTraitV1Info: Contract<ArkadikoStakeRegistryTraitV1Contract> = {
    contract: arkadikoStakeRegistryTraitV1Contract,
    address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
    contractFile: 'contracts/external/arkadiko/arkadiko-stake-registry-trait-v1.clar',
};
