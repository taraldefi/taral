
import { BaseProvider } from '../../../../shared/providers/base-provider';
import { proxy } from '../../../../shared/test-utils/proxy';
import { Contract } from '../../../../shared/types';
import { ArkadikoOracleTraitV1Interface } from './abi';
import type { ArkadikoOracleTraitV1Contract } from './types';


export type { ArkadikoOracleTraitV1Contract } from './types';

export const arkadikoOracleTraitV1Contract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoOracleTraitV1Contract>(ArkadikoOracleTraitV1Interface, provider);
    return contract;
};

export const arkadikoOracleTraitV1Info: Contract<ArkadikoOracleTraitV1Contract> = {
    contract: arkadikoOracleTraitV1Contract,
    address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
    contractFile: 'contracts/external/arkadiko/arkadiko-oracle-trait-v1.clar',
};
