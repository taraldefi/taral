import { ClarityTypes, Transaction } from "taral-shared";

export interface PoxContract {
  allowContractCaller: (
    caller: string,
    untilBurnHt: bigint | null
  ) => Transaction<boolean, bigint>;
  delegateStackStx: (
    stacker: string,
    amountUstx: number | bigint,
    poxAddr: {
      hashbytes: Buffer;
      version: Buffer;
    },
    startBurnHt: number | bigint,
    lockPeriod: number | bigint
  ) => Transaction<
    {
      "lock-amount": bigint;
      stacker: string;
      "unlock-burn-height": bigint;
    },
    bigint
  >;
  delegateStx: (
    amountUstx: number | bigint,
    delegateTo: string,
    untilBurnHt: bigint | null,
    poxAddr: {
      hashbytes: Buffer;
      version: Buffer;
    } | null
  ) => Transaction<boolean, bigint>;
  disallowContractCaller: (caller: string) => Transaction<boolean, bigint>;
  rejectPox: () => Transaction<boolean, bigint>;
  revokeDelegateStx: () => Transaction<boolean, bigint>;
  setBurnchainParameters: (
    firstBurnHeight: number | bigint,
    prepareCycleLength: number | bigint,
    rewardCycleLength: number | bigint,
    rejectionFraction: number | bigint
  ) => Transaction<boolean, bigint>;
  stackAggregationCommit: (
    poxAddr: {
      hashbytes: Buffer;
      version: Buffer;
    },
    rewardCycle: number | bigint
  ) => Transaction<boolean, bigint>;
  stackStx: (
    amountUstx: number | bigint,
    poxAddr: {
      hashbytes: Buffer;
      version: Buffer;
    },
    startBurnHt: number | bigint,
    lockPeriod: number | bigint
  ) => Transaction<
    {
      "lock-amount": bigint;
      stacker: string;
      "unlock-burn-height": bigint;
    },
    bigint
  >;
  canStackStx: (
    poxAddr: {
      hashbytes: Buffer;
      version: Buffer;
    },
    amountUstx: number | bigint,
    firstRewardCycle: number | bigint,
    numCycles: number | bigint
  ) => Promise<ClarityTypes.Response<boolean, bigint>>;
  getPoxInfo: () => Promise<
    ClarityTypes.Response<
      {
        "current-rejection-votes": bigint;
        "first-burnchain-block-height": bigint;
        "min-amount-ustx": bigint;
        "prepare-cycle-length": bigint;
        "rejection-fraction": bigint;
        "reward-cycle-id": bigint;
        "reward-cycle-length": bigint;
        "total-liquid-supply-ustx": bigint;
      },
      null
    >
  >;
  getPoxRejection: (
    stacker: string,
    rewardCycle: number | bigint
  ) => Promise<{
    amount: bigint;
  } | null>;
  getRewardSetPoxAddress: (
    rewardCycle: number | bigint,
    index: number | bigint
  ) => Promise<{
    "pox-addr": {
      hashbytes: Buffer;
      version: Buffer;
    };
    "total-ustx": bigint;
  } | null>;
  getRewardSetSize: (rewardCycle: number | bigint) => Promise<bigint>;
  getStackerInfo: (stacker: string) => Promise<{
    "amount-ustx": bigint;
    "first-reward-cycle": bigint;
    "lock-period": bigint;
    "pox-addr": {
      hashbytes: Buffer;
      version: Buffer;
    };
  } | null>;
  getStackingMinimum: () => Promise<bigint>;
  getTotalUstxStacked: (rewardCycle: number | bigint) => Promise<bigint>;
  isPoxActive: (rewardCycle: number | bigint) => Promise<boolean>;
  minimalCanStackStx: (
    poxAddr: {
      hashbytes: Buffer;
      version: Buffer;
    },
    amountUstx: number | bigint,
    firstRewardCycle: number | bigint,
    numCycles: number | bigint
  ) => Promise<ClarityTypes.Response<boolean, bigint>>;
  ADDRESS_VERSION_P2PKH: () => Promise<Buffer>;
  ADDRESS_VERSION_P2SH: () => Promise<Buffer>;
  ADDRESS_VERSION_P2WPKH: () => Promise<Buffer>;
  ADDRESS_VERSION_P2WSH: () => Promise<Buffer>;
  ERR_DELEGATION_EXPIRES_DURING_LOCK: () => Promise<bigint>;
  ERR_DELEGATION_POX_ADDR_REQUIRED: () => Promise<bigint>;
  ERR_DELEGATION_TOO_MUCH_LOCKED: () => Promise<bigint>;
  ERR_INVALID_START_BURN_HEIGHT: () => Promise<bigint>;
  ERR_NOT_ALLOWED: () => Promise<bigint>;
  ERR_STACKING_ALREADY_DELEGATED: () => Promise<bigint>;
  ERR_STACKING_ALREADY_REJECTED: () => Promise<bigint>;
  ERR_STACKING_ALREADY_STACKED: () => Promise<bigint>;
  ERR_STACKING_EXPIRED: () => Promise<bigint>;
  ERR_STACKING_INSUFFICIENT_FUNDS: () => Promise<bigint>;
  ERR_STACKING_INVALID_AMOUNT: () => Promise<bigint>;
  ERR_STACKING_INVALID_LOCK_PERIOD: () => Promise<bigint>;
  ERR_STACKING_INVALID_POX_ADDRESS: () => Promise<bigint>;
  ERR_STACKING_NO_SUCH_PRINCIPAL: () => Promise<bigint>;
  ERR_STACKING_PERMISSION_DENIED: () => Promise<bigint>;
  ERR_STACKING_POX_ADDRESS_IN_USE: () => Promise<bigint>;
  ERR_STACKING_STX_LOCKED: () => Promise<bigint>;
  ERR_STACKING_THRESHOLD_NOT_MET: () => Promise<bigint>;
  ERR_STACKING_UNREACHABLE: () => Promise<bigint>;
  MAX_POX_REWARD_CYCLES: () => Promise<bigint>;
  MIN_POX_REWARD_CYCLES: () => Promise<bigint>;
  POX_REJECTION_FRACTION: () => Promise<bigint>;
  PREPARE_CYCLE_LENGTH: () => Promise<bigint>;
  REWARD_CYCLE_LENGTH: () => Promise<bigint>;
  STACKING_THRESHOLD_100: () => Promise<bigint>;
  STACKING_THRESHOLD_25: () => Promise<bigint>;
  configured: () => Promise<boolean>;
  firstBurnchainBlockHeight: () => Promise<bigint>;
  poxPrepareCycleLength: () => Promise<bigint>;
  poxRejectionFraction: () => Promise<bigint>;
  poxRewardCycleLength: () => Promise<bigint>;
  allowanceContractCallers: (key: {
    "contract-caller": string;
    sender: string;
  }) => Promise<{
    "until-burn-ht": bigint | null;
  } | null>;
  delegationState: (key: { stacker: string }) => Promise<{
    "amount-ustx": bigint;
    "delegated-to": string;
    "pox-addr": {
      hashbytes: Buffer;
      version: Buffer;
    } | null;
    "until-burn-ht": bigint | null;
  } | null>;
  partialStackedByCycle: (key: {
    "pox-addr": {
      hashbytes: Buffer;
      version: Buffer;
    };
    "reward-cycle": bigint;
    sender: string;
  }) => Promise<{
    "stacked-amount": bigint;
  } | null>;
  rewardCyclePoxAddressList: (key: {
    index: bigint;
    "reward-cycle": bigint;
  }) => Promise<{
    "pox-addr": {
      hashbytes: Buffer;
      version: Buffer;
    };
    "total-ustx": bigint;
  } | null>;
  rewardCyclePoxAddressListLen: (key: { "reward-cycle": bigint }) => Promise<{
    len: bigint;
  } | null>;
  rewardCycleTotalStacked: (key: { "reward-cycle": bigint }) => Promise<{
    "total-ustx": bigint;
  } | null>;
  stackingRejection: (key: { "reward-cycle": bigint }) => Promise<{
    amount: bigint;
  } | null>;
  stackingRejectors: (key: {
    "reward-cycle": bigint;
    stacker: string;
  }) => Promise<{
    amount: bigint;
  } | null>;
  stackingState: (key: { stacker: string }) => Promise<{
    "amount-ustx": bigint;
    "first-reward-cycle": bigint;
    "lock-period": bigint;
    "pox-addr": {
      hashbytes: Buffer;
      version: Buffer;
    };
  } | null>;
}
