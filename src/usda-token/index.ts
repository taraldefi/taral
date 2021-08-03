import { Contract } from '../../shared/types';
import { proxy } from '../../shared/test-utils/proxy';
import { BaseProvider } from '../../shared/providers/base-provider';

import type { UsdaTokenContract } from './types';
import { UsdaTokenInterface } from './abi';

export type { UsdaTokenContract } from './types';

export const usdaTokenContract = (provider: BaseProvider) => {
  const contract = proxy<UsdaTokenContract>(UsdaTokenInterface, provider);
  return contract;
};

export const usdaTokenInfo: Contract<UsdaTokenContract> = {
  contract: usdaTokenContract,
  address: 'ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH',
  contractFile: 'contracts/usda-token.clar',
};
