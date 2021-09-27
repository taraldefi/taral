import { ClarityTypes, Transaction } from "lib-shared";

export interface BtcNftSwapContract {
  cancel: (id: number | bigint, nft: string) => Transaction<boolean, bigint>;
  createSwap: (
    sats: number | bigint,
    btcReceiver: Buffer,
    nftId: number | bigint,
    nftReceiver: string,
    nft: string
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
    pubscriptkey: Buffer
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
    nft: string
  ) => Transaction<boolean, bigint>;
  ERR_ALREADY_DONE: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_FAILED_TO_PARSE_TX: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_INVALID_ID: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_INVALID_NFT: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_NATIVE_FAILURE: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_TOO_EARLY: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_TX_NOT_FOR_RECEIVER: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_TX_VALUE_TOO_SMALL: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_VERIFICATION_FAILED: () => Promise<ClarityTypes.Response<null, bigint>>;
  expiry: () => Promise<bigint>;
  nextId: () => Promise<bigint>;
  swaps: (key: bigint) => Promise<{
    "btc-receiver": Buffer;
    done: bigint;
    nft: string;
    "nft-id": bigint;
    "nft-receiver": string;
    "nft-sender": string;
    sats: bigint;
    when: bigint;
  } | null>;
}
