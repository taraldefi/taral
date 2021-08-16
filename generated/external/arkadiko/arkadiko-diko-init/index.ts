
import { Contract } from '../../../../shared/types';
import { proxy } from '../../../../shared/test-utils/proxy';
import { BaseProvider } from '../../../../shared/providers/base-provider';

import type { ArkadikoDikoInitContract } from './types';
import { ArkadikoDikoInitInterface } from './abi';

export type { ArkadikoDikoInitContract } from './types';

export const arkadikoDikoInitContract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoDikoInitContract>(ArkadikoDikoInitInterface, provider);
  return contract;
};

export const arkadikoDikoInitInfo: Contract<ArkadikoDikoInitContract> = {
  contract: arkadikoDikoInitContract,
  address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
  contractFile: 'contracts/external/arkadiko/arkadiko-diko-init.clar',
};
