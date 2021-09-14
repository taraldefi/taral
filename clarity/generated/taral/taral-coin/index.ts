
import { Contract } from '../../../lib/types';
import { proxy } from '../../../lib/test-utils/proxy';
import { BaseProvider } from '../../../lib/providers/base-provider';

import type { TaralCoinContract } from './types';
import { TaralCoinInterface } from './abi';

export type { TaralCoinContract } from './types';

export const taralCoinContract = (provider: BaseProvider) => {
  const contract = proxy<TaralCoinContract>(TaralCoinInterface, provider);
  return contract;
};

export const taralCoinInfo: Contract<TaralCoinContract> = {
  contract: taralCoinContract,
  address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  contractFile: 'clarity/contracts/taral/taral-coin.clar',
};
