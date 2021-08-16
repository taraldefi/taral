
import { Contract } from '../../../../shared/types';
import { proxy } from '../../../../shared/test-utils/proxy';
import { BaseProvider } from '../../../../shared/providers/base-provider';

import type { WrappedStxTokenContract } from './types';
import { WrappedStxTokenInterface } from './abi';

export type { WrappedStxTokenContract } from './types';

export const wrappedStxTokenContract = (provider: BaseProvider) => {
  const contract = proxy<WrappedStxTokenContract>(WrappedStxTokenInterface, provider);
  return contract;
};

export const wrappedStxTokenInfo: Contract<WrappedStxTokenContract> = {
  contract: wrappedStxTokenContract,
  address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
  contractFile: 'contracts/external/arkadiko/wrapped-stx-token.clar',
};
