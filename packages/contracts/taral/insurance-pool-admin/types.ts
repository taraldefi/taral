import { Transaction } from "lib-shared";
import { ClarityTypes } from "lib-shared";

export interface InsurancePoolAdminContract {
  allowContractCaller: (thisContract: string) => Transaction<string, bigint>;
  claimRewards: (cycle: number | bigint) => Transaction<boolean, bigint>;
  delegateStx: (
    amountUstx: number | bigint,
    stacker: string,
    untilBurnHt: bigint | null,
    poxAddr: {
      hashbytes: Buffer;
      version: Buffer;
    } | null,
    userAddr: {
      hashbytes: Buffer;
      version: Buffer;
    },
    lockingPeriod: number | bigint,
  ) => Transaction<
    {
      "lock-amount": bigint;
      stacker: string;
      "unlock-burn-height": bigint;
    },
    bigint
  >;
  payin: (
    ustx: number | bigint,
    cycle: number | bigint,
  ) => Transaction<boolean, bigint>;
  stackAggregationCommit: (
    rewardCycle: number | bigint,
  ) => Transaction<boolean, bigint>;
  submitRewardTx: (
    block: {
      height: bigint;
      "merkle-root": Buffer;
      nbits: Buffer;
      nonce: Buffer;
      parent: Buffer;
      timestamp: Buffer;
      version: Buffer;
    },
    tx: {
      ins: {
        outpoint: {
          hash: Buffer;
          index: Buffer;
        };
        scriptSig: Buffer;
        sequence: Buffer;
      }[];
      locktime: Buffer;
      outs: {
        scriptPubKey: Buffer;
        value: Buffer;
      }[];
      version: Buffer;
    },
    proof: {
      hashes: Buffer[];
      "tree-depth": bigint;
      "tx-index": bigint;
    },
  ) => Transaction<
    {
      "out-value": bigint;
      price: bigint;
    },
    bigint
  >;
  submitUnauditedRewards: (
    amount: number | bigint,
    cycle: number | bigint,
  ) => Transaction<boolean, bigint>;
  burnHeightToRewardCycle: (height: number | bigint) => Promise<bigint>;
  getNextCycle: () => Promise<bigint>;
  getRewardBalance: (cycle: number | bigint) => Promise<bigint>;
  getRewards: (
    user: string,
    cycle: number | bigint,
  ) => Promise<ClarityTypes.Response<bigint, bigint>>;
  getUnauditedRewards: (cycle: number | bigint) => Promise<bigint>;
  getVaultBalance: (cycle: number | bigint) => Promise<bigint>;
  heightToRewardCycle: (height: number | bigint) => Promise<bigint>;
  rewardCycleToBurnHeight: (cycle: number | bigint) => Promise<bigint>;
  cycles: () => Promise<bigint[]>;
  errAllowContractCallerFailed: () => Promise<
    ClarityTypes.Response<null, bigint>
  >;
  errAlreadyStacked: () => Promise<ClarityTypes.Response<null, bigint>>;
  errCommitNotAllowedNow: () => Promise<ClarityTypes.Response<null, bigint>>;
  errDelegateBelowMinimum: () => Promise<ClarityTypes.Response<null, bigint>>;
  errDelegateInvalidStacker: () => Promise<ClarityTypes.Response<null, bigint>>;
  errInvalidCycle: () => Promise<ClarityTypes.Response<null, bigint>>;
  errMapFunctionFailed: () => Promise<ClarityTypes.Response<null, bigint>>;
  errNonPositiveAmount: () => Promise<ClarityTypes.Response<null, bigint>>;
  errNotEnoughFunds: () => Promise<ClarityTypes.Response<null, bigint>>;
  errPayoutFailed: () => Promise<ClarityTypes.Response<null, bigint>>;
  errPayoutNoRewards: () => Promise<ClarityTypes.Response<null, bigint>>;
  errPayoutTooEarly: () => Promise<ClarityTypes.Response<null, bigint>>;
  errPoolNotActive: () => Promise<ClarityTypes.Response<null, bigint>>;
  poolPoxAddress: () => Promise<{
    hashbytes: Buffer;
    version: Buffer;
  }>;
  userCompensation: () => Promise<bigint>;
  delegationEnabler: () => Promise<string | null>;
  poolAccount: () => Promise<string | null>;
  payins: (key: bigint) => Promise<bigint | null>;
  stackedStxs: (key: { cycle: bigint; stacker: string }) => Promise<{
    "amount-ustx": bigint;
    rewards: bigint | null;
    "stacked-ustx": bigint;
    "until-burn-ht": bigint | null;
  } | null>;
  totalStackedStxs: (key: bigint) => Promise<bigint | null>;
  unauditedRewards: (key: bigint) => Promise<bigint | null>;
  vaults: (key: bigint) => Promise<bigint | null>;
}
