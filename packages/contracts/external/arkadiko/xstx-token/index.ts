import {
  BaseNodeProvider,
  BaseWebProvider,
  NodeContract,
  nodeProxy,
  WebContract,
  webProxy,
} from "lib-shared";
import { XstxTokenInterface } from "./abi";
import type { XstxTokenContract } from "./types";
export type { XstxTokenContract } from "./types";

export const nodeXstxTokenContract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<XstxTokenContract>(XstxTokenInterface, provider);
  return contract;
};

export const nodeXstxTokenInfo: NodeContract<XstxTokenContract> = {
  contract: nodeXstxTokenContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/external/arkadiko/xstx-token.clar",
};

export const webXstxTokenContract = (provider: BaseWebProvider) => {
  const contract = webProxy<XstxTokenContract>(XstxTokenInterface, provider);
  return contract;
};

export const webXstxTokenInfo: WebContract<XstxTokenContract> = {
  contract: webXstxTokenContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/external/arkadiko/xstx-token.clar",
};
