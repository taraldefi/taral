import { BaseProvider } from "../../../../lib/providers/base-provider";
import { proxy } from "../../../../lib/test-utils/proxy";
import { Contract } from "../../../../lib/types";
import { ArkadikoStackerV11Interface } from "./abi";
import type { ArkadikoStackerV11Contract } from "./types";
export type { ArkadikoStackerV11Contract } from "./types";

export const arkadikoStackerV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoStackerV11Contract>(
    ArkadikoStackerV11Interface,
    provider
  );
  return contract;
};

export const arkadikoStackerV11Info: Contract<ArkadikoStackerV11Contract> = {
  contract: arkadikoStackerV11Contract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile:
    "clarity/contracts/external/arkadiko/arkadiko-stacker-v1-1.clar",
};
