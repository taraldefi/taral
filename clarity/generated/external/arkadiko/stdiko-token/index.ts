import { BaseProvider } from "../../../../lib/providers/base-provider";
import { proxy } from "../../../../lib/test-utils/proxy";
import { Contract } from "../../../../lib/types";
import { StdikoTokenInterface } from "./abi";
import type { StdikoTokenContract } from "./types";

export type { StdikoTokenContract } from "./types";

export const stdikoTokenContract = (provider: BaseProvider) => {
  const contract = proxy<StdikoTokenContract>(StdikoTokenInterface, provider);
  return contract;
};

export const stdikoTokenInfo: Contract<StdikoTokenContract> = {
  contract: stdikoTokenContract,
  address: "ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR",
  contractFile: "clarity/contracts/external/arkadiko/stdiko-token.clar",
};
