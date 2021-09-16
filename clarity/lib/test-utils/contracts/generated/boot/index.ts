import { bnsInfo } from './bns';
import { costsInfo } from './costs';
import { costVotingInfo } from './cost-voting';
import { lockupInfo } from './lockup';
import { poxInfo } from './pox';
    export type { BnsContract } from './bns';
export type { CostsContract } from './costs';
export type { CostVotingContract } from './cost-voting';
export type { LockupContract } from './lockup';
export type { PoxContract } from './pox';
    
    export const contracts = {
      bns: bnsInfo,
  costs: costsInfo,
  costVoting: costVotingInfo,
  lockup: lockupInfo,
  pox: poxInfo,
    };
    