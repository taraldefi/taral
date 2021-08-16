
import { Contract } from '../../../../lib/types';
import { proxy } from '../../../../lib/test-utils/proxy';
import { BaseProvider } from '../../../../lib/providers/base-provider';

import type { ArkadikoDaoTokenTraitV1Contract } from './types';
import { ArkadikoDaoTokenTraitV1Interface } from './abi';

export type { ArkadikoDaoTokenTraitV1Contract } from './types';

export const arkadikoDaoTokenTraitV1Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoDaoTokenTraitV1Contract>(ArkadikoDaoTokenTraitV1Interface, provider);
  return contract;
};

export const arkadikoDaoTokenTraitV1Info: Contract<ArkadikoDaoTokenTraitV1Contract> = {
  contract: arkadikoDaoTokenTraitV1Contract,
  address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
  contractFile: 'clarity/contracts/external/arkadiko/arkadiko-dao-token-trait-v1.clar',
};
