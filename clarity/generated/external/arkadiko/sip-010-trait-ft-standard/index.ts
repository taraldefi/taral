import { BaseProvider } from "../../../../lib/providers/base-provider";
import { proxy } from "../../../../lib/test-utils/proxy";
import { Contract } from "../../../../lib/types";
import { Sip010TraitFtStandardInterface } from "./abi";
import type { Sip010TraitFtStandardContract } from "./types";

export type { Sip010TraitFtStandardContract } from "./types";

export const sip010TraitFtStandardContract = (provider: BaseProvider) => {
  const contract = proxy<Sip010TraitFtStandardContract>(
    Sip010TraitFtStandardInterface,
    provider
  );
  return contract;
};

export const sip010TraitFtStandardInfo: Contract<Sip010TraitFtStandardContract> =
  {
    contract: sip010TraitFtStandardContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "clarity/contracts/external/arkadiko/sip-010-trait-ft-standard.clar",
  };
