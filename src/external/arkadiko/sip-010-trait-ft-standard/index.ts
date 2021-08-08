import { BaseProvider } from "../../../../shared/providers/base-provider";
import { proxy } from "../../../../shared/test-utils/proxy";
import { Contract } from "../../../../shared/types";
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
    address: "ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR",
    contractFile: "contracts/external/arkadiko/sip-010-trait-ft-standard.clar",
  };
