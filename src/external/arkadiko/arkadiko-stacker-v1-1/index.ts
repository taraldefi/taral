
import { Contract } from '../../../../shared/types';
import { proxy } from '../../../../shared/test-utils/proxy';
import { BaseProvider } from '../../../../shared/providers/base-provider';

import type { ArkadikoStackerV11Contract } from './types';
import { ArkadikoStackerV11Interface } from './abi';

export type { ArkadikoStackerV11Contract } from './types';

export const arkadikoStackerV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoStackerV11Contract>(ArkadikoStackerV11Interface, provider);
  return contract;
};

export const arkadikoStackerV11Info: Contract<ArkadikoStackerV11Contract> = {
  contract: arkadikoStackerV11Contract,
  address: 'ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH',
  contractFile: 'contracts/external/arkadiko/arkadiko-stacker-v1-1.clar',
};
