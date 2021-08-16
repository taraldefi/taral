
import { Contract } from '../../../shared/types';
import { proxy } from '../../../shared/test-utils/proxy';
import { BaseProvider } from '../../../shared/providers/base-provider';

import type { TaralCoinContract } from './types';
import { TaralCoinInterface } from './abi';

export type { TaralCoinContract } from './types';

export const taralCoinContract = (provider: BaseProvider) => {
  const contract = proxy<TaralCoinContract>(TaralCoinInterface, provider);
  return contract;
};

export const taralCoinInfo: Contract<TaralCoinContract> = {
  contract: taralCoinContract,
  address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
  contractFile: 'contracts/taral/taral-coin.clar',
};
