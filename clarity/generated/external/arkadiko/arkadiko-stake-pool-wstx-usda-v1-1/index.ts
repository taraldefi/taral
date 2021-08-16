
import { Contract } from '../../../../lib/types';
import { proxy } from '../../../../lib/test-utils/proxy';
import { BaseProvider } from '../../../../lib/providers/base-provider';

import type { ArkadikoStakePoolWstxUsdaV11Contract } from './types';
import { ArkadikoStakePoolWstxUsdaV11Interface } from './abi';

export type { ArkadikoStakePoolWstxUsdaV11Contract } from './types';

export const arkadikoStakePoolWstxUsdaV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoStakePoolWstxUsdaV11Contract>(ArkadikoStakePoolWstxUsdaV11Interface, provider);
  return contract;
};

export const arkadikoStakePoolWstxUsdaV11Info: Contract<ArkadikoStakePoolWstxUsdaV11Contract> = {
  contract: arkadikoStakePoolWstxUsdaV11Contract,
  address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
  contractFile: 'clarity/contracts/external/arkadiko/arkadiko-stake-pool-wstx-usda-v1-1.clar',
};
