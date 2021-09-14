import { Contract } from "../../../../lib/types";
import { proxy } from "../../../../lib/test-utils/proxy";
import { BaseProvider } from "../../../../lib/providers/base-provider";

import type { WrappedStxTokenContract } from "./types";
import { WrappedStxTokenInterface } from "./abi";

export type { WrappedStxTokenContract } from "./types";

export const wrappedStxTokenContract = (provider: BaseProvider) => {
  const contract = proxy<WrappedStxTokenContract>(
    WrappedStxTokenInterface,
    provider
  );
  return contract;
};

export const wrappedStxTokenInfo: Contract<WrappedStxTokenContract> = {
  contract: wrappedStxTokenContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "clarity/contracts/external/arkadiko/wrapped-stx-token.clar",
};
