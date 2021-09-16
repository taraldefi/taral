import { BaseProvider } from "../../../../lib/providers/base-provider";
import { proxy } from "../../../../lib/test-utils/proxy";
import { Contract } from "../../../../lib/types";
import { ArkadikoSip10ReserveV11Interface } from "./abi";
import type { ArkadikoSip10ReserveV11Contract } from "./types";
export type { ArkadikoSip10ReserveV11Contract } from "./types";

export const arkadikoSip10ReserveV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoSip10ReserveV11Contract>(
    ArkadikoSip10ReserveV11Interface,
    provider
  );
  return contract;
};

export const arkadikoSip10ReserveV11Info: Contract<ArkadikoSip10ReserveV11Contract> =
  {
    contract: arkadikoSip10ReserveV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "clarity/contracts/external/arkadiko/arkadiko-sip10-reserve-v1-1.clar",
  };
