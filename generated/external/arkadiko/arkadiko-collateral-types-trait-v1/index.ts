
import { Contract } from '../../../../shared/types';
import { proxy } from '../../../../shared/test-utils/proxy';
import { BaseProvider } from '../../../../shared/providers/base-provider';

import type { ArkadikoCollateralTypesTraitV1Contract } from './types';
import { ArkadikoCollateralTypesTraitV1Interface } from './abi';

export type { ArkadikoCollateralTypesTraitV1Contract } from './types';

export const arkadikoCollateralTypesTraitV1Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoCollateralTypesTraitV1Contract>(ArkadikoCollateralTypesTraitV1Interface, provider);
  return contract;
};

export const arkadikoCollateralTypesTraitV1Info: Contract<ArkadikoCollateralTypesTraitV1Contract> = {
  contract: arkadikoCollateralTypesTraitV1Contract,
  address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
  contractFile: 'contracts/external/arkadiko/arkadiko-collateral-types-trait-v1.clar',
};
