import {
  NodeContract,
  WebContract,
  nodeProxy,
  webProxy,
  BaseNodeProvider,
  BaseWebProvider,
} from "lib-shared";
import type { Sip010TokenContract } from "./types";
import { Sip010TokenInterface } from "./abi";
export type { Sip010TokenContract } from "./types";

export const nodeSip010TokenContract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<Sip010TokenContract>(
    Sip010TokenInterface,
    provider,
  );
  return contract;
};

export const nodeSip010TokenInfo: NodeContract<Sip010TokenContract> = {
  contract: nodeSip010TokenContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/sip010-token.clar",
};

export const webSip010TokenContract = (provider: BaseWebProvider) => {
  const contract = webProxy<Sip010TokenContract>(
    Sip010TokenInterface,
    provider,
  );
  return contract;
};

export const webSip010TokenInfo: WebContract<Sip010TokenContract> = {
  contract: webSip010TokenContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/sip010-token.clar",
};
