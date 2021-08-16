
import { Contract } from '../../../../shared/types';
import { proxy } from '../../../../shared/test-utils/proxy';
import { BaseProvider } from '../../../../shared/providers/base-provider';

import type { ArkadikoSip10ReserveV11Contract } from './types';
import { ArkadikoSip10ReserveV11Interface } from './abi';

export type { ArkadikoSip10ReserveV11Contract } from './types';

export const arkadikoSip10ReserveV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoSip10ReserveV11Contract>(ArkadikoSip10ReserveV11Interface, provider);
  return contract;
};

export const arkadikoSip10ReserveV11Info: Contract<ArkadikoSip10ReserveV11Contract> = {
  contract: arkadikoSip10ReserveV11Contract,
  address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
  contractFile: 'contracts/external/arkadiko/arkadiko-sip10-reserve-v1-1.clar',
};
