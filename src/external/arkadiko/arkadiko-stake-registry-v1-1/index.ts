import { Contract } from "../../../../shared/types";
import { proxy } from "../../../../shared/test-utils/proxy";
import { BaseProvider } from "../../../../shared/providers/base-provider";

import type { ArkadikoStakeRegistryV11Contract } from "./types";
import { ArkadikoStakeRegistryV11Interface } from "./abi";

export type { ArkadikoStakeRegistryV11Contract } from "./types";

export const arkadikoStakeRegistryV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoStakeRegistryV11Contract>(
    ArkadikoStakeRegistryV11Interface,
    provider
  );
  return contract;
};

export const arkadikoStakeRegistryV11Info: Contract<ArkadikoStakeRegistryV11Contract> =
  {
    contract: arkadikoStakeRegistryV11Contract,
    address: "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH",
    contractFile:
      "contracts/external/arkadiko/arkadiko-stake-registry-v1-1.clar",
  };
