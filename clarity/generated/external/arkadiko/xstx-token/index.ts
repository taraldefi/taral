
import { Contract } from '../../../../lib/types';
import { proxy } from '../../../../lib/test-utils/proxy';
import { BaseProvider } from '../../../../lib/providers/base-provider';

import type { XstxTokenContract } from './types';
import { XstxTokenInterface } from './abi';

export type { XstxTokenContract } from './types';

export const xstxTokenContract = (provider: BaseProvider) => {
  const contract = proxy<XstxTokenContract>(XstxTokenInterface, provider);
  return contract;
};

export const xstxTokenInfo: Contract<XstxTokenContract> = {
  contract: xstxTokenContract,
  address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
  contractFile: 'clarity/contracts/external/arkadiko/xstx-token.clar',
};
