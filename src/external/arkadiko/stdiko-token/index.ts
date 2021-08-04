import { Contract } from "../../../../shared/types";
import { proxy } from "../../../../shared/test-utils/proxy";
import { BaseProvider } from "../../../../shared/providers/base-provider";

import type { StdikoTokenContract } from "./types";
import { StdikoTokenInterface } from "./abi";

export type { StdikoTokenContract } from "./types";

export const stdikoTokenContract = (provider: BaseProvider) => {
  const contract = proxy<StdikoTokenContract>(StdikoTokenInterface, provider);
  return contract;
};

export const stdikoTokenInfo: Contract<StdikoTokenContract> = {
  contract: stdikoTokenContract,
  address: "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH",
  contractFile: "contracts/external/arkadiko/stdiko-token.clar",
};
