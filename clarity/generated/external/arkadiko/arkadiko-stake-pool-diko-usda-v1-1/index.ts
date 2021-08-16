
import { Contract } from '../../../../lib/types';
import { proxy } from '../../../../lib/test-utils/proxy';
import { BaseProvider } from '../../../../lib/providers/base-provider';

import type { ArkadikoStakePoolDikoUsdaV11Contract } from './types';
import { ArkadikoStakePoolDikoUsdaV11Interface } from './abi';

export type { ArkadikoStakePoolDikoUsdaV11Contract } from './types';

export const arkadikoStakePoolDikoUsdaV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoStakePoolDikoUsdaV11Contract>(ArkadikoStakePoolDikoUsdaV11Interface, provider);
  return contract;
};

export const arkadikoStakePoolDikoUsdaV11Info: Contract<ArkadikoStakePoolDikoUsdaV11Contract> = {
  contract: arkadikoStakePoolDikoUsdaV11Contract,
  address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
  contractFile: 'clarity/contracts/external/arkadiko/arkadiko-stake-pool-diko-usda-v1-1.clar',
};
