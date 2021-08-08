import { BaseProvider } from "../../../shared/providers/base-provider";
import { proxy } from "../../../shared/test-utils/proxy";
import { Contract } from "../../../shared/types";
import { Sip10FtStandardInterface } from "./abi";
import type { Sip10FtStandardContract } from "./types";

export type { Sip10FtStandardContract } from "./types";

export const sip10FtStandardContract = (provider: BaseProvider) => {
  const contract = proxy<Sip10FtStandardContract>(
    Sip10FtStandardInterface,
    provider
  );
  return contract;
};

export const sip10FtStandardInfo: Contract<Sip10FtStandardContract> = {
  contract: sip10FtStandardContract,
  address: "ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR",
  contractFile: "contracts/taral/sip-10-ft-standard.clar",
};
