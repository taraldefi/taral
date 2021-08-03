import { Contract } from '../../shared/types';
import { proxy } from '../../shared/test-utils/proxy';
import { BaseProvider } from '../../shared/providers/base-provider';

import type { ArkadikoSwapTraitV1Contract } from './types';
import { ArkadikoSwapTraitV1Interface } from './abi';

export type { ArkadikoSwapTraitV1Contract } from './types';

export const arkadikoSwapTraitV1Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoSwapTraitV1Contract>(ArkadikoSwapTraitV1Interface, provider);
  return contract;
};

export const arkadikoSwapTraitV1Info: Contract<ArkadikoSwapTraitV1Contract> = {
  contract: arkadikoSwapTraitV1Contract,
  address: 'ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH',
  contractFile: 'contracts/arkadiko-swap-trait-v1.clar',
};
