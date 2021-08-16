import { BaseProvider } from "../../../../lib/providers/base-provider";
import { proxy } from "../../../../lib/test-utils/proxy";
import { Contract } from "../../../../lib/types";
import { ArkadikoStakeRegistryV11Interface } from "./abi";
import type { ArkadikoStakeRegistryV11Contract } from "./types";

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
    address: "ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR",
    contractFile:
      "clarity/contracts/external/arkadiko/arkadiko-stake-registry-v1-1.clar",
  };
