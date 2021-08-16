
import { Contract } from '../../../../shared/types';
import { proxy } from '../../../../shared/test-utils/proxy';
import { BaseProvider } from '../../../../shared/providers/base-provider';

import type { ArkadikoSwapV11Contract } from './types';
import { ArkadikoSwapV11Interface } from './abi';

export type { ArkadikoSwapV11Contract } from './types';

export const arkadikoSwapV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoSwapV11Contract>(ArkadikoSwapV11Interface, provider);
  return contract;
};

export const arkadikoSwapV11Info: Contract<ArkadikoSwapV11Contract> = {
  contract: arkadikoSwapV11Contract,
  address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
  contractFile: 'contracts/external/arkadiko/arkadiko-swap-v1-1.clar',
};
