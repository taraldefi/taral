import { BaseProvider } from "../../../../lib/providers/base-provider";
import { proxy } from "../../../../lib/test-utils/proxy";
import { Contract } from "../../../../lib/types";
import { ArkadikoOracleTraitV1Interface } from "./abi";
import type { ArkadikoOracleTraitV1Contract } from "./types";

export type { ArkadikoOracleTraitV1Contract } from "./types";

export const arkadikoOracleTraitV1Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoOracleTraitV1Contract>(
    ArkadikoOracleTraitV1Interface,
    provider
  );
  return contract;
};

export const arkadikoOracleTraitV1Info: Contract<ArkadikoOracleTraitV1Contract> =
  {
    contract: arkadikoOracleTraitV1Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "clarity/contracts/external/arkadiko/arkadiko-oracle-trait-v1.clar",
  };
