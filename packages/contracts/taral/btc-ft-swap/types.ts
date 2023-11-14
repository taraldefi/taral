import { Transaction } from "lib-shared";
import { ClarityTypes } from "lib-shared";

export interface BtcFtSwapContract {
  cancel: (id: number | bigint, ft: string) => Transaction<boolean, bigint>;
  createSwap: (
    sats: number | bigint,
    btcReceiver: Buffer,
    amount: number | bigint,
    ftReceiver: string | null,
    ft: string,
  ) => Transaction<bigint, bigint>;
  getOutValue: (
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
    pubscriptkey: Buffer,
  ) => Transaction<
    {
      out: {
        scriptPubKey: Buffer;
        value: bigint;
      } | null;
      pubscriptkey: Buffer;
    },
    null
  >;
  setFtReceiver: (id: number | bigint) => Transaction<boolean, bigint>;
  submitSwap: (
    id: number | bigint,
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
    ft: string,
  ) => Transaction<boolean, bigint>;
  ERR_ALREADY_DONE: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_FAILED_TO_PARSE_TX: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_INVALID_FUNGIBLE_TOKEN: () => Promise<
    ClarityTypes.Response<null, bigint>
  >;
  ERR_INVALID_ID: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_NATIVE_FAILURE: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_NO_FT_RECEIVER: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_TOO_EARLY: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_TX_NOT_FOR_RECEIVER: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_TX_VALUE_TOO_SMALL: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_VERIFICATION_FAILED: () => Promise<ClarityTypes.Response<null, bigint>>;
  expiry: () => Promise<bigint>;
  nextId: () => Promise<bigint>;
  swaps: (key: bigint) => Promise<{
    amount: bigint;
    "btc-receiver": Buffer;
    done: bigint;
    ft: string;
    "ft-receiver": string | null;
    "ft-sender": string;
    sats: bigint;
    when: bigint;
  } | null>;
}
