import { Contract } from '../../shared/types';
import { proxy } from '../../shared/test-utils/proxy';
import { BaseProvider } from '../../shared/providers/base-provider';

import type { ArkadikoVaultManagerTraitV1Contract } from './types';
import { ArkadikoVaultManagerTraitV1Interface } from './abi';

export type { ArkadikoVaultManagerTraitV1Contract } from './types';

export const arkadikoVaultManagerTraitV1Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoVaultManagerTraitV1Contract>(ArkadikoVaultManagerTraitV1Interface, provider);
  return contract;
};

export const arkadikoVaultManagerTraitV1Info: Contract<ArkadikoVaultManagerTraitV1Contract> = {
  contract: arkadikoVaultManagerTraitV1Contract,
  address: 'ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH',
  contractFile: 'contracts/arkadiko-vault-manager-trait-v1.clar',
};
