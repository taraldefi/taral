import {
  BaseNodeProvider,
  BaseWebProvider,
  NodeContract,
  nodeProxy,
  WebContract,
  webProxy,
} from "lib-shared";
import { ArkadikoSwapTokenWstxDikoInterface } from "./abi";
import type { ArkadikoSwapTokenWstxDikoContract } from "./types";
export type { ArkadikoSwapTokenWstxDikoContract } from "./types";

export const nodeArkadikoSwapTokenWstxDikoContract = (
  provider: BaseNodeProvider
) => {
  const contract = nodeProxy<ArkadikoSwapTokenWstxDikoContract>(
    ArkadikoSwapTokenWstxDikoInterface,
    provider
  );
  return contract;
};

export const nodeArkadikoSwapTokenWstxDikoInfo: NodeContract<ArkadikoSwapTokenWstxDikoContract> =
  {
    contract: nodeArkadikoSwapTokenWstxDikoContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/external/arkadiko/arkadiko-swap-token-wstx-diko.clar",
  };

export const webArkadikoSwapTokenWstxDikoContract = (
  provider: BaseWebProvider
) => {
  const contract = webProxy<ArkadikoSwapTokenWstxDikoContract>(
    ArkadikoSwapTokenWstxDikoInterface,
    provider
  );
  return contract;
};

export const webArkadikoSwapTokenWstxDikoInfo: WebContract<ArkadikoSwapTokenWstxDikoContract> =
  {
    contract: webArkadikoSwapTokenWstxDikoContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/external/arkadiko/arkadiko-swap-token-wstx-diko.clar",
  };
