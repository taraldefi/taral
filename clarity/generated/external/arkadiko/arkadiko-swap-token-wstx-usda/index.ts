
import { Contract } from '../../../../lib/types';
import { proxy } from '../../../../lib/test-utils/proxy';
import { BaseProvider } from '../../../../lib/providers/base-provider';

import type { ArkadikoSwapTokenWstxUsdaContract } from './types';
import { ArkadikoSwapTokenWstxUsdaInterface } from './abi';

export type { ArkadikoSwapTokenWstxUsdaContract } from './types';

export const arkadikoSwapTokenWstxUsdaContract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoSwapTokenWstxUsdaContract>(ArkadikoSwapTokenWstxUsdaInterface, provider);
  return contract;
};

export const arkadikoSwapTokenWstxUsdaInfo: Contract<ArkadikoSwapTokenWstxUsdaContract> = {
  contract: arkadikoSwapTokenWstxUsdaContract,
  address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  contractFile: 'clarity/contracts/external/arkadiko/arkadiko-swap-token-wstx-usda.clar',
};
