
import { BaseProvider } from '../../../../shared/providers/base-provider';
import { proxy } from '../../../../shared/test-utils/proxy';
import { Contract } from '../../../../shared/types';
import { ArkadikoStxReserveV11Interface } from './abi';
import type { ArkadikoStxReserveV11Contract } from './types';


export type { ArkadikoStxReserveV11Contract } from './types';

export const arkadikoStxReserveV11Contract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoStxReserveV11Contract>(ArkadikoStxReserveV11Interface, provider);
    return contract;
};

export const arkadikoStxReserveV11Info: Contract<ArkadikoStxReserveV11Contract> = {
    contract: arkadikoStxReserveV11Contract,
    address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
    contractFile: 'contracts/external/arkadiko/arkadiko-stx-reserve-v1-1.clar',
};
