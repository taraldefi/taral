import { Transaction } from "lib-shared";
import { ClarityTypes } from "lib-shared";

export interface InsurancePoolAuditContract {
  reportBtcTx: (
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
    }
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
    }
  ) => Transaction<
    {
      "out-value": bigint;
      price: bigint;
    },
    bigint
  >;
  wrappedOracleGetPriceStxBtc: (
    height: number | bigint
  ) => Transaction<bigint, null>;
  burnHeightToRewardCycle: (height: number | bigint) => Promise<bigint>;
  getOutsForPool: (tx: {
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
  }) => Promise<
    ClarityTypes.Response<
      {
        scriptPubKey: Buffer;
        value: bigint;
      }[],
      null
    >
  >;
  getPoolPubscriptkey: () => Promise<Buffer>;
  getRewards: (cycle: number | bigint) => Promise<bigint>;
  getTxValueForPool: (tx: {
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
  }) => Promise<ClarityTypes.Response<bigint, null>>;
  ERR_FAILED_TO_GET_PRICE: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_FAILED_TO_PARSE_TX: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_INSERT_FAILED: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_TOO_MANY_TXS: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_TX_ADD_FAILED: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_TX_NOT_FOR_POOL: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_VERIFICATION_FAILED: () => Promise<ClarityTypes.Response<null, bigint>>;
  poolPubscriptkey: () => Promise<Buffer>;
  poolRewardAddrHash: () => Promise<Buffer>;
  lastPrice: () => Promise<{
    amount: bigint;
    height: bigint;
    timestamp: bigint;
  }>;
  rewardTxs: (key: bigint) => Promise<
    | {
        txid: Buffer;
        value: bigint;
      }[]
    | null
  >;
  rewardsPerCycle: (key: bigint) => Promise<bigint | null>;
}
