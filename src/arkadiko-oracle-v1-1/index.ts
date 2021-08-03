import { Contract } from '../../shared/types';
import { proxy } from '../../shared/test-utils/proxy';
import { BaseProvider } from '../../shared/providers/base-provider';

import type { ArkadikoOracleV11Contract } from './types';
import { ArkadikoOracleV11Interface } from './abi';

export type { ArkadikoOracleV11Contract } from './types';

export const arkadikoOracleV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoOracleV11Contract>(ArkadikoOracleV11Interface, provider);
  return contract;
};

export const arkadikoOracleV11Info: Contract<ArkadikoOracleV11Contract> = {
  contract: arkadikoOracleV11Contract,
  address: 'ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH',
  contractFile: 'contracts/arkadiko-oracle-v1-1.clar',
};
