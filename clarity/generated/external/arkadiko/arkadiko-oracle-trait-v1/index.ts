
import { Contract } from '../../../../lib/types';
import { proxy } from '../../../../lib/test-utils/proxy';
import { BaseProvider } from '../../../../lib/providers/base-provider';

import type { ArkadikoOracleTraitV1Contract } from './types';
import { ArkadikoOracleTraitV1Interface } from './abi';

export type { ArkadikoOracleTraitV1Contract } from './types';

export const arkadikoOracleTraitV1Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoOracleTraitV1Contract>(ArkadikoOracleTraitV1Interface, provider);
  return contract;
};

export const arkadikoOracleTraitV1Info: Contract<ArkadikoOracleTraitV1Contract> = {
  contract: arkadikoOracleTraitV1Contract,
  address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
  contractFile: 'clarity/contracts/external/arkadiko/arkadiko-oracle-trait-v1.clar',
};
