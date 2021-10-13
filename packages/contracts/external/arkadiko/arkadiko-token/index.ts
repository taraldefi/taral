import {
  BaseNodeProvider,
  BaseWebProvider,
  NodeContract,
  nodeProxy,
  WebContract,
  webProxy,
} from "lib-shared";
import { ArkadikoTokenInterface } from "./abi";
import type { ArkadikoTokenContract } from "./types";
export type { ArkadikoTokenContract } from "./types";

export const nodeArkadikoTokenContract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<ArkadikoTokenContract>(
    ArkadikoTokenInterface,
    provider
  );
  return contract;
};

export const nodeArkadikoTokenInfo: NodeContract<ArkadikoTokenContract> = {
  contract: nodeArkadikoTokenContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile:
    "packages/clarity/contracts/external/arkadiko/arkadiko-token.clar",
};

export const webArkadikoTokenContract = (provider: BaseWebProvider) => {
  const contract = webProxy<ArkadikoTokenContract>(
    ArkadikoTokenInterface,
    provider
  );
  return contract;
};

export const webArkadikoTokenInfo: WebContract<ArkadikoTokenContract> = {
  contract: webArkadikoTokenContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile:
    "packages/clarity/contracts/external/arkadiko/arkadiko-token.clar",
};
