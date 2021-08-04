import { Contract } from "../../../../shared/types";
import { proxy } from "../../../../shared/test-utils/proxy";
import { BaseProvider } from "../../../../shared/providers/base-provider";

import type { PoxContract } from "./types";
import { PoxInterface } from "./abi";

export type { PoxContract } from "./types";

export const poxContract = (provider: BaseProvider) => {
  const contract = proxy<PoxContract>(PoxInterface, provider);
  return contract;
};

export const poxInfo: Contract<PoxContract> = {
  contract: poxContract,
  address: "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH",
  contractFile: "contracts/external/core/pox.clar",
};
