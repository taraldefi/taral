import { BaseProvider } from "../../../lib/providers/base-provider";
import { proxy } from "../../../lib/test-utils/proxy";
import { Contract } from "../../../lib/types";
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
  contractFile: "clarity/contracts/boot/cost-voting.clar",
};
