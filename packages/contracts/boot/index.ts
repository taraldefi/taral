import { nodeBnsInfo, webBnsInfo } from "./bns";
import { nodeCostVotingInfo, webCostVotingInfo } from "./cost-voting";
import { nodeCostsInfo, webCostsInfo } from "./costs";
import { nodeLockupInfo, webLockupInfo } from "./lockup";
import { nodePoxInfo, webPoxInfo } from "./pox";
export type { BnsContract } from "./bns";
export type { CostVotingContract } from "./cost-voting";
export type { CostsContract } from "./costs";
export type { LockupContract } from "./lockup";
export type { PoxContract } from "./pox";

export const nodeBootContracts = {
    nodeBns: nodeBnsInfo,
    nodeCosts: nodeCostsInfo,
    nodeCostVoting: nodeCostVotingInfo,
    nodeLockup: nodeLockupInfo,
    nodePox: nodePoxInfo,
};

export const webBootContracts = {
    webBns: webBnsInfo,
    webCosts: webCostsInfo,
    webCostVoting: webCostVotingInfo,
    webLockup: webLockupInfo,
    webPox: webPoxInfo,
};
