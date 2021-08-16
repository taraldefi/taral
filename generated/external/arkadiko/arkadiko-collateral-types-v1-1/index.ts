
import { Contract } from '../../../../lib/types';
import { proxy } from '../../../../lib/test-utils/proxy';
import { BaseProvider } from '../../../../lib/providers/base-provider';

import type { ArkadikoCollateralTypesV11Contract } from './types';
import { ArkadikoCollateralTypesV11Interface } from './abi';

export type { ArkadikoCollateralTypesV11Contract } from './types';

export const arkadikoCollateralTypesV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoCollateralTypesV11Contract>(ArkadikoCollateralTypesV11Interface, provider);
  return contract;
};

export const arkadikoCollateralTypesV11Info: Contract<ArkadikoCollateralTypesV11Contract> = {
  contract: arkadikoCollateralTypesV11Contract,
  address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
  contractFile: 'contracts/external/arkadiko/arkadiko-collateral-types-v1-1.clar',
};
