import { Transaction } from '../../../lib/transaction';
import { ClarityTypes } from '../../../lib/clarity/types';

// prettier-ignore

export interface ClarityBitcoinContract {
  buffToU8: (byte: Buffer) => Promise<number>;
  concatHeader: (block: {
    "height": number;
  "merkle-root": Buffer;
  "nbits": Buffer;
  "nonce": Buffer;
  "parent": Buffer;
  "timestamp": Buffer;
  "version": Buffer
      }) => Promise<Buffer>;
  concatIn: (inVariable: {
    "outpoint": {
    "hash": Buffer;
  "index": Buffer
      };
  "scriptSig": Buffer;
  "sequence": Buffer
      }, result: Buffer) => Promise<Buffer>;
  concatIns: (ins: {
    "outpoint": {
    "hash": Buffer;
  "index": Buffer
      };
  "scriptSig": Buffer;
  "sequence": Buffer
      }[]) => Promise<Buffer>;
  concatOut: (out: {
    "scriptPubKey": Buffer;
  "value": Buffer
      }, result: Buffer) => Promise<Buffer>;
  concatOuts: (outs: {
    "scriptPubKey": Buffer;
  "value": Buffer
      }[]) => Promise<Buffer>;
  concatTx: (tx: {
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
      }) => Promise<Buffer>;
  concatVar: (buffer: Buffer) => Promise<Buffer>;
  getBcHHash: (bh: number) => Promise<Buffer | null>;
  getReversedTxid: (tx: Buffer) => Promise<Buffer>;
  getTxid: (tx: Buffer) => Promise<Buffer>;
  innerBuff32Permutation: (targetIndex: number, state: {
    "hash-input": Buffer;
  "hash-output": Buffer
      }) => Promise<{
    "hash-input": Buffer;
  "hash-output": Buffer
      }>;
  innerMerkleProofVerify: (ctr: number, state: {
    "cur-hash": Buffer;
  "path": number;
  "proof-hashes": Buffer[];
  "root-hash": Buffer;
  "tree-depth": number;
  "verified": boolean
      }) => Promise<{
    "cur-hash": Buffer;
  "path": number;
  "proof-hashes": Buffer[];
  "root-hash": Buffer;
  "tree-depth": number;
  "verified": boolean
      }>;
  innerReadSlice: (chunk_size: number, input: {
    "acc": Buffer;
  "buffer": Buffer;
  "index": number;
  "remaining": number
      }) => Promise<{
    "acc": Buffer;
  "buffer": Buffer;
  "index": number;
  "remaining": number
      }>;
  innerReadSlice1024: (ignored: boolean, input: {
    "acc": Buffer;
  "data": Buffer;
  "index": number
      }) => Promise<{
    "acc": Buffer;
  "data": Buffer;
  "index": number
      }>;
  isBitSet: (val: number, bit: number) => Promise<boolean>;
  parseBlockHeader: (headerbuff: Buffer) => Promise<ClarityTypes.Response<{
    "merkle-root": Buffer;
  "nbits": number;
  "nonce": number;
  "parent": Buffer;
  "timestamp": number;
  "version": number
      }, number>>;
  parseTx: (tx: Buffer) => Promise<ClarityTypes.Response<{
    "ins": {
    "outpoint": {
    "hash": Buffer;
  "index": number
      };
  "scriptSig": Buffer;
  "sequence": number
      }[];
  "locktime": number;
  "outs": {
    "scriptPubKey": Buffer;
  "value": number
      }[];
  "version": number
      }, number>>;
  readHashslice: (oldCtx: {
    "index": number;
  "txbuff": Buffer
      }) => Promise<ClarityTypes.Response<{
    "ctx": {
    "index": number;
  "txbuff": Buffer
      };
  "hashslice": Buffer
      }, number>>;
  readNextTxin: (ignored: boolean, stateRes: ClarityTypes.Response<{
    "ctx": {
    "index": number;
  "txbuff": Buffer
      };
  "remaining": number;
  "txins": {
    "outpoint": {
    "hash": Buffer;
  "index": number
      };
  "scriptSig": Buffer;
  "sequence": number
      }[]
      }, number>) => Promise<ClarityTypes.Response<{
    "ctx": {
    "index": number;
  "txbuff": Buffer
      };
  "remaining": number;
  "txins": {
    "outpoint": {
    "hash": Buffer;
  "index": number
      };
  "scriptSig": Buffer;
  "sequence": number
      }[]
      }, number>>;
  readNextTxout: (ignored: boolean, stateRes: ClarityTypes.Response<{
    "ctx": {
    "index": number;
  "txbuff": Buffer
      };
  "remaining": number;
  "txouts": {
    "scriptPubKey": Buffer;
  "value": number
      }[]
      }, number>) => Promise<ClarityTypes.Response<{
    "ctx": {
    "index": number;
  "txbuff": Buffer
      };
  "remaining": number;
  "txouts": {
    "scriptPubKey": Buffer;
  "value": number
      }[]
      }, number>>;
  readSlice: (data: Buffer, offset: number, size: number) => Promise<ClarityTypes.Response<Buffer, number>>;
  readSlice1: (input: {
    "data": Buffer;
  "index": number
      }) => Promise<Buffer>;
  readSlice128: (input: {
    "data": Buffer;
  "index": number
      }) => Promise<Buffer>;
  readSlice16: (input: {
    "data": Buffer;
  "index": number
      }) => Promise<Buffer>;
  readSlice2: (input: {
    "data": Buffer;
  "index": number
      }) => Promise<Buffer>;
  readSlice256: (input: {
    "data": Buffer;
  "index": number
      }) => Promise<Buffer>;
  readSlice32: (input: {
    "data": Buffer;
  "index": number
      }) => Promise<Buffer>;
  readSlice4: (input: {
    "data": Buffer;
  "index": number
      }) => Promise<Buffer>;
  readSlice512: (input: {
    "data": Buffer;
  "index": number
      }) => Promise<Buffer>;
  readSlice64: (input: {
    "data": Buffer;
  "index": number
      }) => Promise<Buffer>;
  readSlice8: (input: {
    "data": Buffer;
  "index": number
      }) => Promise<Buffer>;
  readTxins: (ctx: {
    "index": number;
  "txbuff": Buffer
      }) => Promise<ClarityTypes.Response<{
    "ctx": {
    "index": number;
  "txbuff": Buffer
      };
  "remaining": number;
  "txins": {
    "outpoint": {
    "hash": Buffer;
  "index": number
      };
  "scriptSig": Buffer;
  "sequence": number
      }[]
      }, number>>;
  readTxouts: (ctx: {
    "index": number;
  "txbuff": Buffer
      }) => Promise<ClarityTypes.Response<{
    "ctx": {
    "index": number;
  "txbuff": Buffer
      };
  "remaining": number;
  "txouts": {
    "scriptPubKey": Buffer;
  "value": number
      }[]
      }, number>>;
  readUint16: (ctx: {
    "index": number;
  "txbuff": Buffer
      }) => Promise<ClarityTypes.Response<{
    "ctx": {
    "index": number;
  "txbuff": Buffer
      };
  "uint16": number
      }, number>>;
  readUint32: (ctx: {
    "index": number;
  "txbuff": Buffer
      }) => Promise<ClarityTypes.Response<{
    "ctx": {
    "index": number;
  "txbuff": Buffer
      };
  "uint32": number
      }, number>>;
  readUint64: (ctx: {
    "index": number;
  "txbuff": Buffer
      }) => Promise<ClarityTypes.Response<{
    "ctx": {
    "index": number;
  "txbuff": Buffer
      };
  "uint64": number
      }, number>>;
  readVarint: (ctx: {
    "index": number;
  "txbuff": Buffer
      }) => Promise<ClarityTypes.Response<{
    "ctx": {
    "index": number;
  "txbuff": Buffer
      };
  "varint": number
      }, number>>;
  readVarslice: (oldCtx: {
    "index": number;
  "txbuff": Buffer
      }) => Promise<ClarityTypes.Response<{
    "ctx": {
    "index": number;
  "txbuff": Buffer
      };
  "varslice": Buffer
      }, number>>;
  reverseBuff32: (input: Buffer) => Promise<Buffer>;
  verifyBlockHeader: (headerbuff: Buffer, expectedBlockHeight: number) => Promise<boolean>;
  verifyMerkleProof: (reversedTxid: Buffer, merkleRoot: Buffer, proof: {
    "hashes": Buffer[];
  "tree-depth": number;
  "tx-index": number
      }) => Promise<ClarityTypes.Response<boolean, number>>;
  wasTxMined: (block: {
    "height": number;
  "merkle-root": Buffer;
  "nbits": Buffer;
  "nonce": Buffer;
  "parent": Buffer;
  "timestamp": Buffer;
  "version": Buffer
      }, tx: Buffer, proof: {
    "hashes": Buffer[];
  "tree-depth": number;
  "tx-index": number
      }) => Promise<ClarityTypes.Response<boolean, number>>;
  wasTxMinedCompact: (block: {
    "header": Buffer;
  "height": number
      }, tx: Buffer, proof: {
    "hashes": Buffer[];
  "tree-depth": number;
  "tx-index": number
      }) => Promise<ClarityTypes.Response<boolean, number>>;
  BUFF_TO_BYTE: () => Promise<Buffer[]>;
  ERRBADHEADER: () => Promise<number>;
  ERROUTOFBOUNDS: () => Promise<number>;
  ERRPROOFTOOSHORT: () => Promise<number>;
  ERRTOOMANYTXINS: () => Promise<number>;
  ERRTOOMANYTXOUTS: () => Promise<number>;
  ERRVARSLICETOOLONG: () => Promise<number>;
  LIST_128: () => Promise<boolean[]>;
  LIST_16: () => Promise<boolean[]>;
  LIST_256: () => Promise<boolean[]>;
  LIST_32: () => Promise<boolean[]>;
  LIST_512: () => Promise<boolean[]>;
  LIST_64: () => Promise<boolean[]>;
}
