import { Contract } from "../../shared/types";
import { proxy } from "../../shared/test-utils/proxy";
import { BaseProvider } from "../../shared/providers/base-provider";

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
  address: "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH",
  contractFile: "contracts/sip-10-ft-standard.clar",
};
