
import { Contract } from '../../../../lib/types';
import { proxy } from '../../../../lib/test-utils/proxy';
import { BaseProvider } from '../../../../lib/providers/base-provider';

import type { ArkadikoOracleV11Contract } from './types';
import { ArkadikoOracleV11Interface } from './abi';

export type { ArkadikoOracleV11Contract } from './types';

export const arkadikoOracleV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoOracleV11Contract>(ArkadikoOracleV11Interface, provider);
  return contract;
};

export const arkadikoOracleV11Info: Contract<ArkadikoOracleV11Contract> = {
  contract: arkadikoOracleV11Contract,
  address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  contractFile: 'clarity/contracts/external/arkadiko/arkadiko-oracle-v1-1.clar',
};
