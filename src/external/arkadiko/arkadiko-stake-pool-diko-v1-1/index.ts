import { Contract } from "../../../../shared/types";
import { proxy } from "../../../../shared/test-utils/proxy";
import { BaseProvider } from "../../../../shared/providers/base-provider";

import type { ArkadikoStakePoolDikoV11Contract } from "./types";
import { ArkadikoStakePoolDikoV11Interface } from "./abi";

export type { ArkadikoStakePoolDikoV11Contract } from "./types";

export const arkadikoStakePoolDikoV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoStakePoolDikoV11Contract>(
    ArkadikoStakePoolDikoV11Interface,
    provider
  );
  return contract;
};

export const arkadikoStakePoolDikoV11Info: Contract<ArkadikoStakePoolDikoV11Contract> =
  {
    contract: arkadikoStakePoolDikoV11Contract,
    address: "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH",
    contractFile:
      "contracts/external/arkadiko/arkadiko-stake-pool-diko-v1-1.clar",
  };
