
import { BaseProvider } from '../../../../shared/providers/base-provider';
import { proxy } from '../../../../shared/test-utils/proxy';
import { Contract } from '../../../../shared/types';
import { UsdaTokenInterface } from './abi';
import type { UsdaTokenContract } from './types';


export type { UsdaTokenContract } from './types';

export const usdaTokenContract = (provider: BaseProvider) => {
    const contract = proxy<UsdaTokenContract>(UsdaTokenInterface, provider);
    return contract;
};

export const usdaTokenInfo: Contract<UsdaTokenContract> = {
    contract: usdaTokenContract,
    address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
    contractFile: 'contracts/external/arkadiko/usda-token.clar',
};
