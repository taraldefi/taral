
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
  address: 'ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH',
  contractFile: 'contracts/external/arkadiko/wrapped-stx-token.clar',
};
