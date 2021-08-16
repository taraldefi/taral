
import { Contract } from '../../../../shared/types';
import { proxy } from '../../../../shared/test-utils/proxy';
import { BaseProvider } from '../../../../shared/providers/base-provider';

import type { ArkadikoDaoContract } from './types';
import { ArkadikoDaoInterface } from './abi';

export type { ArkadikoDaoContract } from './types';

export const arkadikoDaoContract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoDaoContract>(ArkadikoDaoInterface, provider);
  return contract;
};

export const arkadikoDaoInfo: Contract<ArkadikoDaoContract> = {
  contract: arkadikoDaoContract,
  address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
  contractFile: 'contracts/external/arkadiko/arkadiko-dao.clar',
};
