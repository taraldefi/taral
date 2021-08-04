
import { Contract } from '../../../../shared/types';
import { proxy } from '../../../../shared/test-utils/proxy';
import { BaseProvider } from '../../../../shared/providers/base-provider';

import type { ArkadikoOracleTraitV1Contract } from './types';
import { ArkadikoOracleTraitV1Interface } from './abi';

export type { ArkadikoOracleTraitV1Contract } from './types';

export const arkadikoOracleTraitV1Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoOracleTraitV1Contract>(ArkadikoOracleTraitV1Interface, provider);
  return contract;
};

export const arkadikoOracleTraitV1Info: Contract<ArkadikoOracleTraitV1Contract> = {
  contract: arkadikoOracleTraitV1Contract,
  address: 'ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH',
  contractFile: 'contracts/external/arkadiko/arkadiko-oracle-trait-v1.clar',
};
