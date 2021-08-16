import { BaseProvider } from "../../../../lib/providers/base-provider";
import { proxy } from "../../../../lib/test-utils/proxy";
import { Contract } from "../../../../lib/types";
import { ArkadikoStakePoolWstxDikoV11Interface } from "./abi";
import type { ArkadikoStakePoolWstxDikoV11Contract } from "./types";

export type { ArkadikoStakePoolWstxDikoV11Contract } from "./types";

export const arkadikoStakePoolWstxDikoV11Contract = (
  provider: BaseProvider
) => {
  const contract = proxy<ArkadikoStakePoolWstxDikoV11Contract>(
    ArkadikoStakePoolWstxDikoV11Interface,
    provider
  );
  return contract;
};

export const arkadikoStakePoolWstxDikoV11Info: Contract<ArkadikoStakePoolWstxDikoV11Contract> =
  {
    contract: arkadikoStakePoolWstxDikoV11Contract,
    address: "ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR",
    contractFile:
      "clarity/contracts/external/arkadiko/arkadiko-stake-pool-wstx-diko-v1-1.clar",
  };
