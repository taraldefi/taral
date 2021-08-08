import { BaseProvider } from "../../../../shared/providers/base-provider";
import { proxy } from "../../../../shared/test-utils/proxy";
import { Contract } from "../../../../shared/types";
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
  address: "ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR",
  contractFile: "contracts/external/arkadiko/arkadiko-stacker-v1-1.clar",
};
