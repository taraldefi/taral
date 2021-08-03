import { Contract } from '../../shared/types';
import { proxy } from '../../shared/test-utils/proxy';
import { BaseProvider } from '../../shared/providers/base-provider';

import type { ArkadikoDikoGuardianV11Contract } from './types';
import { ArkadikoDikoGuardianV11Interface } from './abi';

export type { ArkadikoDikoGuardianV11Contract } from './types';

export const arkadikoDikoGuardianV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoDikoGuardianV11Contract>(ArkadikoDikoGuardianV11Interface, provider);
  return contract;
};

export const arkadikoDikoGuardianV11Info: Contract<ArkadikoDikoGuardianV11Contract> = {
  contract: arkadikoDikoGuardianV11Contract,
  address: 'ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH',
  contractFile: 'contracts/arkadiko-diko-guardian-v1-1.clar',
};
