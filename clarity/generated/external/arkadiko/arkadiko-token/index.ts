import { BaseProvider } from "../../../../lib/providers/base-provider";
import { proxy } from "../../../../lib/test-utils/proxy";
import { Contract } from "../../../../lib/types";
import { ArkadikoTokenInterface } from "./abi";
import type { ArkadikoTokenContract } from "./types";

export type { ArkadikoTokenContract } from "./types";

export const arkadikoTokenContract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoTokenContract>(
    ArkadikoTokenInterface,
    provider
  );
  return contract;
};

export const arkadikoTokenInfo: Contract<ArkadikoTokenContract> = {
  contract: arkadikoTokenContract,
  address: "ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR",
  contractFile: "clarity/contracts/external/arkadiko/arkadiko-token.clar",
};
