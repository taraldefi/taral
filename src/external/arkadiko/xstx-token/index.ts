import { Contract } from "../../../../shared/types";
import { proxy } from "../../../../shared/test-utils/proxy";
import { BaseProvider } from "../../../../shared/providers/base-provider";

import type { XstxTokenContract } from "./types";
import { XstxTokenInterface } from "./abi";

export type { XstxTokenContract } from "./types";

export const xstxTokenContract = (provider: BaseProvider) => {
  const contract = proxy<XstxTokenContract>(XstxTokenInterface, provider);
  return contract;
};

export const xstxTokenInfo: Contract<XstxTokenContract> = {
  contract: xstxTokenContract,
  address: "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH",
  contractFile: "contracts/external/arkadiko/xstx-token.clar",
};
