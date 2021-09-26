
  
  import { Contract, proxy, BaseProvider } from 'lib-shared';
  import type { ArkadikoCollateralTypesTraitV1Contract } from './types';
  import { ArkadikoCollateralTypesTraitV1Interface } from './abi';
  export type { ArkadikoCollateralTypesTraitV1Contract } from './types';

  export const arkadikoCollateralTypesTraitV1Contract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoCollateralTypesTraitV1Contract>(ArkadikoCollateralTypesTraitV1Interface, provider);
    return contract;
  };

  export const arkadikoCollateralTypesTraitV1Info: Contract<ArkadikoCollateralTypesTraitV1Contract> = {
    contract: arkadikoCollateralTypesTraitV1Contract,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractFile: 'packages/clarity/contracts/external/arkadiko/arkadiko-collateral-types-trait-v1.clar',
  };