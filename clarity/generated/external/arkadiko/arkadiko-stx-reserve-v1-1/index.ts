
import { Contract } from '../../../../lib/types';
import { proxy } from '../../../../lib/test-utils/proxy';
import { BaseProvider } from '../../../../lib/providers/base-provider';

import type { ArkadikoStxReserveV11Contract } from './types';
import { ArkadikoStxReserveV11Interface } from './abi';

export type { ArkadikoStxReserveV11Contract } from './types';

export const arkadikoStxReserveV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoStxReserveV11Contract>(ArkadikoStxReserveV11Interface, provider);
  return contract;
};

export const arkadikoStxReserveV11Info: Contract<ArkadikoStxReserveV11Contract> = {
  contract: arkadikoStxReserveV11Contract,
  address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
  contractFile: 'clarity/contracts/external/arkadiko/arkadiko-stx-reserve-v1-1.clar',
};
