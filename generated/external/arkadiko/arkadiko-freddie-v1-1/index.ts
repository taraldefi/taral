
import { Contract } from '../../../../shared/types';
import { proxy } from '../../../../shared/test-utils/proxy';
import { BaseProvider } from '../../../../shared/providers/base-provider';

import type { ArkadikoFreddieV11Contract } from './types';
import { ArkadikoFreddieV11Interface } from './abi';

export type { ArkadikoFreddieV11Contract } from './types';

export const arkadikoFreddieV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoFreddieV11Contract>(ArkadikoFreddieV11Interface, provider);
  return contract;
};

export const arkadikoFreddieV11Info: Contract<ArkadikoFreddieV11Contract> = {
  contract: arkadikoFreddieV11Contract,
  address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
  contractFile: 'contracts/external/arkadiko/arkadiko-freddie-v1-1.clar',
};
