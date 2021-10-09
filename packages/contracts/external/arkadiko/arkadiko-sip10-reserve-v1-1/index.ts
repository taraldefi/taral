import {
  BaseNodeProvider,
  BaseWebProvider,
  NodeContract,
  nodeProxy,
  WebContract,
  webProxy,
} from "lib-shared";
import { ArkadikoSip10ReserveV11Interface } from "./abi";
import type { ArkadikoSip10ReserveV11Contract } from "./types";
export type { ArkadikoSip10ReserveV11Contract } from "./types";

export const nodeArkadikoSip10ReserveV11Contract = (
  provider: BaseNodeProvider
) => {
  const contract = nodeProxy<ArkadikoSip10ReserveV11Contract>(
    ArkadikoSip10ReserveV11Interface,
    provider
  );
  return contract;
};

export const nodeArkadikoSip10ReserveV11Info: NodeContract<ArkadikoSip10ReserveV11Contract> =
  {
    contract: nodeArkadikoSip10ReserveV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/external/arkadiko/arkadiko-sip10-reserve-v1-1.clar",
  };

export const webArkadikoSip10ReserveV11Contract = (
  provider: BaseWebProvider
) => {
  const contract = webProxy<ArkadikoSip10ReserveV11Contract>(
    ArkadikoSip10ReserveV11Interface,
    provider
  );
  return contract;
};

export const webArkadikoSip10ReserveV11Info: WebContract<ArkadikoSip10ReserveV11Contract> =
  {
    contract: webArkadikoSip10ReserveV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/external/arkadiko/arkadiko-sip10-reserve-v1-1.clar",
  };
