import { BaseProvider } from "../../../../lib/providers/base-provider";
import { proxy } from "../../../../lib/test-utils/proxy";
import { Contract } from "../../../../lib/types";
import { ArkadikoStakePoolTraitV1Interface } from "./abi";
import type { ArkadikoStakePoolTraitV1Contract } from "./types";
export type { ArkadikoStakePoolTraitV1Contract } from "./types";

export const arkadikoStakePoolTraitV1Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoStakePoolTraitV1Contract>(
    ArkadikoStakePoolTraitV1Interface,
    provider
  );
  return contract;
};

export const arkadikoStakePoolTraitV1Info: Contract<ArkadikoStakePoolTraitV1Contract> =
  {
    contract: arkadikoStakePoolTraitV1Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "clarity/contracts/external/arkadiko/arkadiko-stake-pool-trait-v1.clar",
  };
