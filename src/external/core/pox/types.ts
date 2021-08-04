import { Transaction } from '../../../../shared/transaction';
import { ClarityTypes } from '../../../../shared/clarity/types';
import { IMetadata } from '../../../../shared/providers/types';

// prettier-ignore

export interface PoxContract {
  allowContractCaller: (caller: string, untilBurnHt: number | null, metadata: IMetadata) => Transaction<boolean, number>;
  delegateStackStx: (stacker: string, amountUstx: number, poxAddr: {
    "hashbytes": Buffer;
  "version": Buffer
      }, startBurnHt: number, lockPeriod: number, metadata: IMetadata) => Transaction<{
    "lock-amount": number;
  "stacker": string;
  "unlock-burn-height": number
      }, number>;
  delegateStx: (amountUstx: number, delegateTo: string, untilBurnHt: number | null, poxAddr: {
    "hashbytes": Buffer;
  "version": Buffer
      } | null, metadata: IMetadata) => Transaction<boolean, number>;
  disallowContractCaller: (caller: string, metadata: IMetadata) => Transaction<boolean, number>;
  rejectPox: (metadata: IMetadata) => Transaction<boolean, number>;
  revokeDelegateStx: (metadata: IMetadata) => Transaction<boolean, number>;
  setBurnchainParameters: (firstBurnHeight: number, prepareCycleLength: number, rewardCycleLength: number, rejectionFraction: number, metadata: IMetadata) => Transaction<boolean, number>;
  stackAggregationCommit: (poxAddr: {
    "hashbytes": Buffer;
  "version": Buffer
      }, rewardCycle: number, metadata: IMetadata) => Transaction<boolean, number>;
  stackStx: (amountUstx: number, poxAddr: {
    "hashbytes": Buffer;
  "version": Buffer
      }, startBurnHt: number, lockPeriod: number, metadata: IMetadata) => Transaction<{
    "lock-amount": number;
  "stacker": string;
  "unlock-burn-height": number
      }, number>;
  canStackStx: (poxAddr: {
    "hashbytes": Buffer;
  "version": Buffer
      }, amountUstx: number, firstRewardCycle: number, numCycles: number, metadata: IMetadata) => Promise<ClarityTypes.Response<boolean, number>>;
  getPoxInfo: (metadata: IMetadata) => Promise<ClarityTypes.Response<{
    "current-rejection-votes": number;
  "first-burnchain-block-height": number;
  "min-amount-ustx": number;
  "prepare-cycle-length": number;
  "rejection-fraction": number;
  "reward-cycle-id": number;
  "reward-cycle-length": number;
  "total-liquid-supply-ustx": number
      }, null>>;
  getPoxRejection: (stacker: string, rewardCycle: number, metadata: IMetadata) => Promise<{
    "amount": number
      } | null>;
  getRewardSetPoxAddress: (rewardCycle: number, index: number, metadata: IMetadata) => Promise<{
    "pox-addr": {
    "hashbytes": Buffer;
  "version": Buffer
      };
  "total-ustx": number
      } | null>;
  getRewardSetSize: (rewardCycle: number, metadata: IMetadata) => Promise<number>;
  getStackerInfo: (stacker: string, metadata: IMetadata) => Promise<{
    "amount-ustx": number;
  "first-reward-cycle": number;
  "lock-period": number;
  "pox-addr": {
    "hashbytes": Buffer;
  "version": Buffer
      }
      } | null>;
  getStackingMinimum: (metadata: IMetadata) => Promise<number>;
  getTotalUstxStacked: (rewardCycle: number, metadata: IMetadata) => Promise<number>;
  isPoxActive: (rewardCycle: number, metadata: IMetadata) => Promise<boolean>;
  minimalCanStackStx: (poxAddr: {
    "hashbytes": Buffer;
  "version": Buffer
      }, amountUstx: number, firstRewardCycle: number, numCycles: number, metadata: IMetadata) => Promise<ClarityTypes.Response<boolean, number>>;
  ADDRESS_VERSION_P2PKH: () => Promise<Buffer>;
  ADDRESS_VERSION_P2SH: () => Promise<Buffer>;
  ADDRESS_VERSION_P2WPKH: () => Promise<Buffer>;
  ADDRESS_VERSION_P2WSH: () => Promise<Buffer>;
  ERR_DELEGATION_EXPIRES_DURING_LOCK: () => Promise<number>;
  ERR_DELEGATION_POX_ADDR_REQUIRED: () => Promise<number>;
  ERR_DELEGATION_TOO_MUCH_LOCKED: () => Promise<number>;
  ERR_INVALID_START_BURN_HEIGHT: () => Promise<number>;
  ERR_NOT_ALLOWED: () => Promise<number>;
  ERR_STACKING_ALREADY_DELEGATED: () => Promise<number>;
  ERR_STACKING_ALREADY_REJECTED: () => Promise<number>;
  ERR_STACKING_ALREADY_STACKED: () => Promise<number>;
  ERR_STACKING_EXPIRED: () => Promise<number>;
  ERR_STACKING_INSUFFICIENT_FUNDS: () => Promise<number>;
  ERR_STACKING_INVALID_AMOUNT: () => Promise<number>;
  ERR_STACKING_INVALID_LOCK_PERIOD: () => Promise<number>;
  ERR_STACKING_INVALID_POX_ADDRESS: () => Promise<number>;
  ERR_STACKING_NO_SUCH_PRINCIPAL: () => Promise<number>;
  ERR_STACKING_PERMISSION_DENIED: () => Promise<number>;
  ERR_STACKING_POX_ADDRESS_IN_USE: () => Promise<number>;
  ERR_STACKING_STX_LOCKED: () => Promise<number>;
  ERR_STACKING_THRESHOLD_NOT_MET: () => Promise<number>;
  ERR_STACKING_UNREACHABLE: () => Promise<number>;
  MAX_POX_REWARD_CYCLES: () => Promise<number>;
  MIN_POX_REWARD_CYCLES: () => Promise<number>;
  POX_REJECTION_FRACTION: () => Promise<number>;
  PREPARE_CYCLE_LENGTH: () => Promise<number>;
  REWARD_CYCLE_LENGTH: () => Promise<number>;
  STACKING_THRESHOLD_100: () => Promise<number>;
  STACKING_THRESHOLD_25: () => Promise<number>;
  configured: () => Promise<boolean>;
  firstBurnchainBlockHeight: () => Promise<number>;
  poxPrepareCycleLength: () => Promise<number>;
  poxRejectionFraction: () => Promise<number>;
  poxRewardCycleLength: () => Promise<number>;
  allowanceContractCallers: (key: {
    "contract-caller": string;
  "sender": string
      }) => Promise<{
    "until-burn-ht": number | null
      } | null>;
  delegationState: (key: {
    "stacker": string
      }) => Promise<{
    "amount-ustx": number;
  "delegated-to": string;
  "pox-addr": {
    "hashbytes": Buffer;
  "version": Buffer
      } | null;
  "until-burn-ht": number | null
      } | null>;
  partialStackedByCycle: (key: {
    "pox-addr": {
    "hashbytes": Buffer;
  "version": Buffer
      };
  "reward-cycle": number;
  "sender": string
      }) => Promise<{
    "stacked-amount": number
      } | null>;
  rewardCyclePoxAddressList: (key: {
    "index": number;
  "reward-cycle": number
      }) => Promise<{
    "pox-addr": {
    "hashbytes": Buffer;
  "version": Buffer
      };
  "total-ustx": number
      } | null>;
  rewardCyclePoxAddressListLen: (key: {
    "reward-cycle": number
      }) => Promise<{
    "len": number
      } | null>;
  rewardCycleTotalStacked: (key: {
    "reward-cycle": number
      }) => Promise<{
    "total-ustx": number
      } | null>;
  stackingRejection: (key: {
    "reward-cycle": number
      }) => Promise<{
    "amount": number
      } | null>;
  stackingRejectors: (key: {
    "reward-cycle": number;
  "stacker": string
      }) => Promise<{
    "amount": number
      } | null>;
  stackingState: (key: {
    "stacker": string
      }) => Promise<{
    "amount-ustx": number;
  "first-reward-cycle": number;
  "lock-period": number;
  "pox-addr": {
    "hashbytes": Buffer;
  "version": Buffer
      }
      } | null>;
}
