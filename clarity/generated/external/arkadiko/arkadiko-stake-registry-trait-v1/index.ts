import { Contract } from "../../../../lib/types";
import { proxy } from "../../../../lib/test-utils/proxy";
import { BaseProvider } from "../../../../lib/providers/base-provider";

import type { ArkadikoStakeRegistryTraitV1Contract } from "./types";
import { ArkadikoStakeRegistryTraitV1Interface } from "./abi";

export type { ArkadikoStakeRegistryTraitV1Contract } from "./types";

export const arkadikoStakeRegistryTraitV1Contract = (
  provider: BaseProvider
) => {
  const contract = proxy<ArkadikoStakeRegistryTraitV1Contract>(
    ArkadikoStakeRegistryTraitV1Interface,
    provider
  );
  return contract;
};

export const arkadikoStakeRegistryTraitV1Info: Contract<ArkadikoStakeRegistryTraitV1Contract> =
  {
    contract: arkadikoStakeRegistryTraitV1Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "clarity/contracts/external/arkadiko/arkadiko-stake-registry-trait-v1.clar",
  };
