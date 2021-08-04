
import { Contract } from '../../../../shared/types';
import { proxy } from '../../../../shared/test-utils/proxy';
import { BaseProvider } from '../../../../shared/providers/base-provider';

import type { ArkadikoStxReserveV11Contract } from './types';
import { ArkadikoStxReserveV11Interface } from './abi';

export type { ArkadikoStxReserveV11Contract } from './types';

export const arkadikoStxReserveV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoStxReserveV11Contract>(ArkadikoStxReserveV11Interface, provider);
  return contract;
};

export const arkadikoStxReserveV11Info: Contract<ArkadikoStxReserveV11Contract> = {
  contract: arkadikoStxReserveV11Contract,
  address: 'ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH',
  contractFile: 'contracts/external/arkadiko/arkadiko-stx-reserve-v1-1.clar',
};
