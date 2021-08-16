
import { Contract } from '../../../lib/types';
import { proxy } from '../../../lib/test-utils/proxy';
import { BaseProvider } from '../../../lib/providers/base-provider';

import type { TestUtilsContract } from './types';
import { TestUtilsInterface } from './abi';

export type { TestUtilsContract } from './types';

export const testUtilsContract = (provider: BaseProvider) => {
  const contract = proxy<TestUtilsContract>(TestUtilsInterface, provider);
  return contract;
};

export const testUtilsInfo: Contract<TestUtilsContract> = {
  contract: testUtilsContract,
  address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
  contractFile: 'contracts/test-utils/test-utils.clar',
};
