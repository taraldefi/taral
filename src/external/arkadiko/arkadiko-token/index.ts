import { BaseProvider } from "../../../../shared/providers/base-provider";
import { proxy } from "../../../../shared/test-utils/proxy";
import { Contract } from "../../../../shared/types";
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
  address: "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH",
  contractFile: "contracts/external/arkadiko/arkadiko-token.clar",
};
