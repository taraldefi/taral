
import { BaseProvider } from '../../../../shared/providers/base-provider';
import { proxy } from '../../../../shared/test-utils/proxy';
import { Contract } from '../../../../shared/types';
import { ArkadikoTokenInterface } from './abi';
import type { ArkadikoTokenContract } from './types';


export type { ArkadikoTokenContract } from './types';

export const arkadikoTokenContract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoTokenContract>(ArkadikoTokenInterface, provider);
    return contract;
};

export const arkadikoTokenInfo: Contract<ArkadikoTokenContract> = {
    contract: arkadikoTokenContract,
    address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
    contractFile: 'contracts/external/arkadiko/arkadiko-token.clar',
};
