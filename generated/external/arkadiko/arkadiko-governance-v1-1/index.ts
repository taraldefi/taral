
import { Contract } from '../../../../lib/types';
import { proxy } from '../../../../lib/test-utils/proxy';
import { BaseProvider } from '../../../../lib/providers/base-provider';

import type { ArkadikoGovernanceV11Contract } from './types';
import { ArkadikoGovernanceV11Interface } from './abi';

export type { ArkadikoGovernanceV11Contract } from './types';

export const arkadikoGovernanceV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoGovernanceV11Contract>(ArkadikoGovernanceV11Interface, provider);
  return contract;
};

export const arkadikoGovernanceV11Info: Contract<ArkadikoGovernanceV11Contract> = {
  contract: arkadikoGovernanceV11Contract,
  address: 'ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR',
  contractFile: 'contracts/external/arkadiko/arkadiko-governance-v1-1.clar',
};
