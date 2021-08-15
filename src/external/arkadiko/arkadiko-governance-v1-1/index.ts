
import { BaseProvider } from '../../../../shared/providers/base-provider';
import { proxy } from '../../../../shared/test-utils/proxy';
import { Contract } from '../../../../shared/types';
import { ArkadikoGovernanceV11Interface } from './abi';
import type { ArkadikoGovernanceV11Contract } from './types';


export type { ArkadikoGovernanceV11Contract } from './types';

export const arkadikoGovernanceV11Contract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoGovernanceV11Contract>(ArkadikoGovernanceV11Interface, provider);
    return contract;
};

export const arkadikoGovernanceV11Info: Contract<ArkadikoGovernanceV11Contract> = {
    contract: arkadikoGovernanceV11Contract,
    address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
    contractFile: 'contracts/external/arkadiko/arkadiko-governance-v1-1.clar',
};
