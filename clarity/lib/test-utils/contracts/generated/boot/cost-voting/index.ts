import { BaseProvider } from "../../../../../providers/base-provider";
import { proxy } from "../../../../../test-utils/proxy";
import { Contract } from "../../../../../types";
import { CostVotingInterface } from "./abi";
import type { CostVotingContract } from "./types";
export type { CostVotingContract } from "./types";

export const costVotingContract = (provider: BaseProvider) => {
  const contract = proxy<CostVotingContract>(CostVotingInterface, provider);
  return contract;
};

export const costVotingInfo: Contract<CostVotingContract> = {
  contract: costVotingContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "clarity/lib/test-utils/contracts/boot/cost-voting.clar",
};
