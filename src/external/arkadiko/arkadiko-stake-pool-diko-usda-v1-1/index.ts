
import { Contract } from '../../../../shared/types';
import { proxy } from '../../../../shared/test-utils/proxy';
import { BaseProvider } from '../../../../shared/providers/base-provider';

import type { ArkadikoStakePoolDikoUsdaV11Contract } from './types';
import { ArkadikoStakePoolDikoUsdaV11Interface } from './abi';

export type { ArkadikoStakePoolDikoUsdaV11Contract } from './types';

export const arkadikoStakePoolDikoUsdaV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoStakePoolDikoUsdaV11Contract>(ArkadikoStakePoolDikoUsdaV11Interface, provider);
  return contract;
};

export const arkadikoStakePoolDikoUsdaV11Info: Contract<ArkadikoStakePoolDikoUsdaV11Contract> = {
  contract: arkadikoStakePoolDikoUsdaV11Contract,
  address: 'ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH',
  contractFile: 'contracts/external/arkadiko/arkadiko-stake-pool-diko-usda-v1-1.clar',
};
