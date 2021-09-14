import { Transaction } from '../../../lib/transaction';
import { ClarityTypes } from '../../../lib/clarity/types';

// prettier-ignore

export interface BtcNftSwapContract {
  cancel: (id: number, nft: string) => Transaction<boolean, number>;
  createSwap: (sats: number, btcReceiver: Buffer, nftId: number, nftReceiver: string, nft: string) => Transaction<number, number>;
  getOutValue: (tx: {
    "ins": {
    "outpoint": {
    "hash": Buffer;
  "index": Buffer
      };
  "scriptSig": Buffer;
  "sequence": Buffer
      }[];
  "locktime": Buffer;
  "outs": {
    "scriptPubKey": Buffer;
  "value": Buffer
      }[];
  "version": Buffer
      }, pubscriptkey: Buffer) => Transaction<{
    "out": {
    "scriptPubKey": Buffer;
  "value": number
      } | null;
  "pubscriptkey": Buffer
      }, null>;
  submitSwap: (id: number, block: {
    "height": number;
  "merkle-root": Buffer;
  "nbits": Buffer;
  "nonce": Buffer;
  "parent": Buffer;
  "timestamp": Buffer;
  "version": Buffer
      }, tx: {
    "ins": {
    "outpoint": {
    "hash": Buffer;
  "index": Buffer
      };
  "scriptSig": Buffer;
  "sequence": Buffer
      }[];
  "locktime": Buffer;
  "outs": {
    "scriptPubKey": Buffer;
  "value": Buffer
      }[];
  "version": Buffer
      }, proof: {
    "hashes": Buffer[];
  "tree-depth": number;
  "tx-index": number
      }, nft: string) => Transaction<boolean, number>;
  ERR_ALREADY_DONE: () => Promise<ClarityTypes.Response<null, number>>;
  ERR_FAILED_TO_PARSE_TX: () => Promise<ClarityTypes.Response<null, number>>;
  ERR_INVALID_ID: () => Promise<ClarityTypes.Response<null, number>>;
  ERR_INVALID_NFT: () => Promise<ClarityTypes.Response<null, number>>;
  ERR_NATIVE_FAILURE: () => Promise<ClarityTypes.Response<null, number>>;
  ERR_TOO_EARLY: () => Promise<ClarityTypes.Response<null, number>>;
  ERR_TX_NOT_FOR_RECEIVER: () => Promise<ClarityTypes.Response<null, number>>;
  ERR_TX_VALUE_TOO_SMALL: () => Promise<ClarityTypes.Response<null, number>>;
  ERR_VERIFICATION_FAILED: () => Promise<ClarityTypes.Response<null, number>>;
  expiry: () => Promise<number>;
  nextId: () => Promise<number>;
  swaps: (key: number) => Promise<{
    "btc-receiver": Buffer;
  "done": number;
  "nft": string;
  "nft-id": number;
  "nft-receiver": string;
  "nft-sender": string;
  "sats": number;
  "when": number
      } | null>;
}
