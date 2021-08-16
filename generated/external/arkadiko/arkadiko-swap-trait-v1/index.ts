
import { Contract } from '../../../../shared/types';
import { proxy } from '../../../../shared/test-utils/proxy';
import { BaseProvider } from '../../../../shared/providers/base-provider';

import type { ArkadikoSwapTraitV1Contract } from './types';
import { ArkadikoSwapTraitV1Interface } from './abi';

export type { ArkadikoSwapTraitV1Contract } from './types';

export const arkadikoSwapTraitV1Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoSwapTraitV1Contract>(ArkadikoSwapTraitV1Interface, provider);
  return contract;
};

export const arkadikoSwapTraitV1Info: Contract<ArkadikoSwapTraitV1Contract> = {
  contract: arkadikoSwapTraitV1Contract,
  address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
  contractFile: 'contracts/external/arkadiko/arkadiko-swap-trait-v1.clar',
};
