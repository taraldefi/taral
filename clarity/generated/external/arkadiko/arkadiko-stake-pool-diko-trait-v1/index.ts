import { BaseProvider } from "../../../../lib/providers/base-provider";
import { proxy } from "../../../../lib/test-utils/proxy";
import { Contract } from "../../../../lib/types";
import { ArkadikoStakePoolDikoTraitV1Interface } from "./abi";
import type { ArkadikoStakePoolDikoTraitV1Contract } from "./types";

export type { ArkadikoStakePoolDikoTraitV1Contract } from "./types";

export const arkadikoStakePoolDikoTraitV1Contract = (
  provider: BaseProvider
) => {
  const contract = proxy<ArkadikoStakePoolDikoTraitV1Contract>(
    ArkadikoStakePoolDikoTraitV1Interface,
    provider
  );
  return contract;
};

export const arkadikoStakePoolDikoTraitV1Info: Contract<ArkadikoStakePoolDikoTraitV1Contract> =
  {
    contract: arkadikoStakePoolDikoTraitV1Contract,
    address: "ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR",
    contractFile:
      "clarity/contracts/external/arkadiko/arkadiko-stake-pool-diko-trait-v1.clar",
  };
