import { BaseProvider } from "../../../../shared/providers/base-provider";
import { proxy } from "../../../../shared/test-utils/proxy";
import { Contract } from "../../../../shared/types";
import { ArkadikoFreddieV11Interface } from "./abi";
import type { ArkadikoFreddieV11Contract } from "./types";

export type { ArkadikoFreddieV11Contract } from "./types";

export const arkadikoFreddieV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoFreddieV11Contract>(
    ArkadikoFreddieV11Interface,
    provider
  );
  return contract;
};

export const arkadikoFreddieV11Info: Contract<ArkadikoFreddieV11Contract> = {
  contract: arkadikoFreddieV11Contract,
  address: "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH",
  contractFile: "contracts/external/arkadiko/arkadiko-freddie-v1-1.clar",
};
