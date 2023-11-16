import {
  NodeContract,
  WebContract,
  nodeProxy,
  webProxy,
  BaseNodeProvider,
  BaseWebProvider,
} from "lib-shared";
import type { TaralLenderContract } from "./types";
import { TaralLenderInterface } from "./abi";
export type { TaralLenderContract } from "./types";

export const nodeTaralLenderContract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<TaralLenderContract>(
    TaralLenderInterface,
    provider,
  );
  return contract;
};

export const nodeTaralLenderInfo: NodeContract<TaralLenderContract> = {
  contract: nodeTaralLenderContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/taral-lender.clar",
};

export const webTaralLenderContract = (provider: BaseWebProvider) => {
  const contract = webProxy<TaralLenderContract>(
    TaralLenderInterface,
    provider,
  );
  return contract;
};

export const webTaralLenderInfo: WebContract<TaralLenderContract> = {
  contract: webTaralLenderContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/taral/taral-lender.clar",
};
