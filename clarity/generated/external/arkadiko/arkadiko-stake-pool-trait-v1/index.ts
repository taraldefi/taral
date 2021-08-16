
import { Contract } from '../../../../lib/types';
import { proxy } from '../../../../lib/test-utils/proxy';
import { BaseProvider } from '../../../../lib/providers/base-provider';

import type { ArkadikoStakePoolTraitV1Contract } from './types';
import { ArkadikoStakePoolTraitV1Interface } from './abi';

export type { ArkadikoStakePoolTraitV1Contract } from './types';

export const arkadikoStakePoolTraitV1Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoStakePoolTraitV1Contract>(ArkadikoStakePoolTraitV1Interface, provider);
  return contract;
};

export const arkadikoStakePoolTraitV1Info: Contract<ArkadikoStakePoolTraitV1Contract> = {
  contract: arkadikoStakePoolTraitV1Contract,
  address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
  contractFile: 'clarity/contracts/external/arkadiko/arkadiko-stake-pool-trait-v1.clar',
};
