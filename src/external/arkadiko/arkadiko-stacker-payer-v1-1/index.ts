
import { BaseProvider } from '../../../../shared/providers/base-provider';
import { proxy } from '../../../../shared/test-utils/proxy';
import { Contract } from '../../../../shared/types';
import { ArkadikoStackerPayerV11Interface } from './abi';
import type { ArkadikoStackerPayerV11Contract } from './types';


export type { ArkadikoStackerPayerV11Contract } from './types';

export const arkadikoStackerPayerV11Contract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoStackerPayerV11Contract>(ArkadikoStackerPayerV11Interface, provider);
    return contract;
};

export const arkadikoStackerPayerV11Info: Contract<ArkadikoStackerPayerV11Contract> = {
    contract: arkadikoStackerPayerV11Contract,
    address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
    contractFile: 'contracts/external/arkadiko/arkadiko-stacker-payer-v1-1.clar',
};
