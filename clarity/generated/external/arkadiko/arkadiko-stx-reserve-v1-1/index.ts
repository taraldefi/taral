import { BaseProvider } from "../../../../lib/providers/base-provider";
import { proxy } from "../../../../lib/test-utils/proxy";
import { Contract } from "../../../../lib/types";
import { ArkadikoStxReserveV11Interface } from "./abi";
import type { ArkadikoStxReserveV11Contract } from "./types";
export type { ArkadikoStxReserveV11Contract } from "./types";

export const arkadikoStxReserveV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoStxReserveV11Contract>(
    ArkadikoStxReserveV11Interface,
    provider
  );
  return contract;
};

export const arkadikoStxReserveV11Info: Contract<ArkadikoStxReserveV11Contract> =
  {
    contract: arkadikoStxReserveV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "clarity/contracts/external/arkadiko/arkadiko-stx-reserve-v1-1.clar",
  };
