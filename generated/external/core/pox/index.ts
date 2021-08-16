
import { Contract } from '../../../../lib/types';
import { proxy } from '../../../../lib/test-utils/proxy';
import { BaseProvider } from '../../../../lib/providers/base-provider';

import type { PoxContract } from './types';
import { PoxInterface } from './abi';

export type { PoxContract } from './types';

export const poxContract = (provider: BaseProvider) => {
  const contract = proxy<PoxContract>(PoxInterface, provider);
  return contract;
};

export const poxInfo: Contract<PoxContract> = {
  contract: poxContract,
  address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
  contractFile: 'contracts/external/core/pox.clar',
};
