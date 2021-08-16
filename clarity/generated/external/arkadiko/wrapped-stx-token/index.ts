import { BaseProvider } from "../../../../lib/providers/base-provider";
import { proxy } from "../../../../lib/test-utils/proxy";
import { Contract } from "../../../../lib/types";
import { WrappedStxTokenInterface } from "./abi";
import type { WrappedStxTokenContract } from "./types";

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
  address: "ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR",
  contractFile: "clarity/contracts/external/arkadiko/wrapped-stx-token.clar",
};
