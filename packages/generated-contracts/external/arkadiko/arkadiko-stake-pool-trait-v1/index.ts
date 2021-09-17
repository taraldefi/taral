

import { BaseProvider, Contract, proxy } from 'taral-shared';
import { ArkadikoStakePoolTraitV1Interface } from './abi';
import type { ArkadikoStakePoolTraitV1Contract } from './types';
export type { ArkadikoStakePoolTraitV1Contract } from './types';

export const arkadikoStakePoolTraitV1Contract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoStakePoolTraitV1Contract>(ArkadikoStakePoolTraitV1Interface, provider);
    return contract;
};

export const arkadikoStakePoolTraitV1Info: Contract<ArkadikoStakePoolTraitV1Contract> = {
    contract: arkadikoStakePoolTraitV1Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'C:\biz\taral/packages/clarity/contracts/external/arkadiko/arkadiko-stake-pool-trait-v1.clar',
};
