import { bnsInfo } from "./bns";
import { costVotingInfo } from "./cost-voting";
import { costsInfo } from "./costs";
import { lockupInfo } from "./lockup";
import { poxInfo } from "./pox";
export type { BnsContract } from "./bns";
export type { CostVotingContract } from "./cost-voting";
export type { CostsContract } from "./costs";
export type { LockupContract } from "./lockup";
export type { PoxContract } from "./pox";

export const bootContracts = {
  bns: bnsInfo,
  costs: costsInfo,
  costVoting: costVotingInfo,
  lockup: lockupInfo,
  pox: poxInfo,
};
