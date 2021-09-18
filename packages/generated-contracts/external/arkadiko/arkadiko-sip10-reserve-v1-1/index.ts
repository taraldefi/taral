import { BaseProvider, Contract, proxy } from "taral-shared";
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
      "packages/clarity/contracts/external/arkadiko/arkadiko-sip10-reserve-v1-1.clar",
  };
