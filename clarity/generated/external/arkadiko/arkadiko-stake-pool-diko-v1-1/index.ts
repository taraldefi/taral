
import { Contract } from '../../../../lib/types';
import { proxy } from '../../../../lib/test-utils/proxy';
import { BaseProvider } from '../../../../lib/providers/base-provider';

import type { ArkadikoStakePoolDikoV11Contract } from './types';
import { ArkadikoStakePoolDikoV11Interface } from './abi';

export type { ArkadikoStakePoolDikoV11Contract } from './types';

export const arkadikoStakePoolDikoV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoStakePoolDikoV11Contract>(ArkadikoStakePoolDikoV11Interface, provider);
  return contract;
};

export const arkadikoStakePoolDikoV11Info: Contract<ArkadikoStakePoolDikoV11Contract> = {
  contract: arkadikoStakePoolDikoV11Contract,
  address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
  contractFile: 'clarity/contracts/external/arkadiko/arkadiko-stake-pool-diko-v1-1.clar',
};
