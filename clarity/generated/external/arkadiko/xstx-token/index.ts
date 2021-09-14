import { Contract } from "../../../../lib/types";
import { proxy } from "../../../../lib/test-utils/proxy";
import { BaseProvider } from "../../../../lib/providers/base-provider";

import type { XstxTokenContract } from "./types";
import { XstxTokenInterface } from "./abi";

export type { XstxTokenContract } from "./types";

export const xstxTokenContract = (provider: BaseProvider) => {
  const contract = proxy<XstxTokenContract>(XstxTokenInterface, provider);
  return contract;
};

export const xstxTokenInfo: Contract<XstxTokenContract> = {
  contract: xstxTokenContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "clarity/contracts/external/arkadiko/xstx-token.clar",
};
