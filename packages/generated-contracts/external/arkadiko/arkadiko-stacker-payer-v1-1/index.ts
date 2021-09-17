

import { BaseProvider, Contract, proxy } from 'taral-shared';
import { ArkadikoStackerPayerV11Interface } from './abi';
import type { ArkadikoStackerPayerV11Contract } from './types';
export type { ArkadikoStackerPayerV11Contract } from './types';

export const arkadikoStackerPayerV11Contract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoStackerPayerV11Contract>(ArkadikoStackerPayerV11Interface, provider);
    return contract;
};

export const arkadikoStackerPayerV11Info: Contract<ArkadikoStackerPayerV11Contract> = {
    contract: arkadikoStackerPayerV11Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'C:\biz\taral/packages/clarity/contracts/external/arkadiko/arkadiko-stacker-payer-v1-1.clar',
};
