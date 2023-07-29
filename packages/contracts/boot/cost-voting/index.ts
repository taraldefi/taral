import {
  NodeContract,
  WebContract,
  nodeProxy,
  webProxy,
  BaseNodeProvider,
  BaseWebProvider,
} from "lib-shared";
import type { CostVotingContract } from "./types";
import { CostVotingInterface } from "./abi";
export type { CostVotingContract } from "./types";

export const nodeCostVotingContract = (provider: BaseNodeProvider) => {
  const contract = nodeProxy<CostVotingContract>(CostVotingInterface, provider);
  return contract;
};

export const nodeCostVotingInfo: NodeContract<CostVotingContract> = {
  contract: nodeCostVotingContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/boot/cost-voting.clar",
};

export const webCostVotingContract = (provider: BaseWebProvider) => {
  const contract = webProxy<CostVotingContract>(CostVotingInterface, provider);
  return contract;
};

export const webCostVotingInfo: WebContract<CostVotingContract> = {
  contract: webCostVotingContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "packages/clarity/contracts/boot/cost-voting.clar",
};
