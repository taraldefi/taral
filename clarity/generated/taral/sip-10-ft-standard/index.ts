import { Contract } from "../../../lib/types";
import { proxy } from "../../../lib/test-utils/proxy";
import { BaseProvider } from "../../../lib/providers/base-provider";

import type { Sip10FtStandardContract } from "./types";
import { Sip10FtStandardInterface } from "./abi";

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
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "clarity/contracts/taral/sip-10-ft-standard.clar",
};
