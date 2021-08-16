
import { Contract } from '../../../../shared/types';
import { proxy } from '../../../../shared/test-utils/proxy';
import { BaseProvider } from '../../../../shared/providers/base-provider';

import type { ArkadikoStakeRegistryTraitV1Contract } from './types';
import { ArkadikoStakeRegistryTraitV1Interface } from './abi';

export type { ArkadikoStakeRegistryTraitV1Contract } from './types';

export const arkadikoStakeRegistryTraitV1Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoStakeRegistryTraitV1Contract>(ArkadikoStakeRegistryTraitV1Interface, provider);
  return contract;
};

export const arkadikoStakeRegistryTraitV1Info: Contract<ArkadikoStakeRegistryTraitV1Contract> = {
  contract: arkadikoStakeRegistryTraitV1Contract,
  address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
  contractFile: 'contracts/external/arkadiko/arkadiko-stake-registry-trait-v1.clar',
};
