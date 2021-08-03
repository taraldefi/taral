import { Contract } from '../../shared/types';
import { proxy } from '../../shared/test-utils/proxy';
import { BaseProvider } from '../../shared/providers/base-provider';

import type { CounterCoinContract } from './types';
import { CounterCoinInterface } from './abi';

export type { CounterCoinContract } from './types';

export const counterCoinContract = (provider: BaseProvider) => {
  const contract = proxy<CounterCoinContract>(CounterCoinInterface, provider);
  return contract;
};

export const counterCoinInfo: Contract<CounterCoinContract> = {
  contract: counterCoinContract,
  address: 'ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH',
  contractFile: 'contracts/counter-coin.clar',
};
