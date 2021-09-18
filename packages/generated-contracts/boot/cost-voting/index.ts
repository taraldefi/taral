import { BaseProvider, Contract, proxy } from "taral-shared";
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
  contractFile: "packages/clarity/contracts/boot/cost-voting.clar",
};
