
import { Contract } from '../../../../lib/types';
import { proxy } from '../../../../lib/test-utils/proxy';
import { BaseProvider } from '../../../../lib/providers/base-provider';

import type { ArkadikoLiquidatorV11Contract } from './types';
import { ArkadikoLiquidatorV11Interface } from './abi';

export type { ArkadikoLiquidatorV11Contract } from './types';

export const arkadikoLiquidatorV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoLiquidatorV11Contract>(ArkadikoLiquidatorV11Interface, provider);
  return contract;
};

export const arkadikoLiquidatorV11Info: Contract<ArkadikoLiquidatorV11Contract> = {
  contract: arkadikoLiquidatorV11Contract,
  address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
  contractFile: 'contracts/external/arkadiko/arkadiko-liquidator-v1-1.clar',
};
