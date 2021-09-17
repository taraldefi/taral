import { ClarityTypes } from "../../../lib/clarity/types";

export interface ClarityBitcoinContract {
  buffToU8: (byte: Buffer) => Promise<bigint>;
  concatHeader: (block: {
    height: bigint;
    "merkle-root": Buffer;
    nbits: Buffer;
    nonce: Buffer;
    parent: Buffer;
    timestamp: Buffer;
    version: Buffer;
  }) => Promise<Buffer>;
  concatIn: (
    inVariable: {
      outpoint: {
        hash: Buffer;
        index: Buffer;
      };
      scriptSig: Buffer;
      sequence: Buffer;
    },
    result: Buffer
  ) => Promise<Buffer>;
  concatIns: (
    ins: {
      outpoint: {
        hash: Buffer;
        index: Buffer;
      };
      scriptSig: Buffer;
      sequence: Buffer;
    }[]
  ) => Promise<Buffer>;
  concatOut: (
    out: {
      scriptPubKey: Buffer;
      value: Buffer;
    },
    result: Buffer
  ) => Promise<Buffer>;
  concatOuts: (
    outs: {
      scriptPubKey: Buffer;
      value: Buffer;
    }[]
  ) => Promise<Buffer>;
  concatTx: (tx: {
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
  }) => Promise<Buffer>;
  concatVar: (buffer: Buffer) => Promise<Buffer>;
  getBcHHash: (bh: number | bigint) => Promise<Buffer | null>;
  getReversedTxid: (tx: Buffer) => Promise<Buffer>;
  getTxid: (tx: Buffer) => Promise<Buffer>;
  innerBuff32Permutation: (
    targetIndex: number | bigint,
    state: {
      "hash-input": Buffer;
      "hash-output": Buffer;
    }
  ) => Promise<{
    "hash-input": Buffer;
    "hash-output": Buffer;
  }>;
  innerMerkleProofVerify: (
    ctr: number | bigint,
    state: {
      "cur-hash": Buffer;
      path: bigint;
      "proof-hashes": Buffer[];
      "root-hash": Buffer;
      "tree-depth": bigint;
      verified: boolean;
    }
  ) => Promise<{
    "cur-hash": Buffer;
    path: bigint;
    "proof-hashes": Buffer[];
    "root-hash": Buffer;
    "tree-depth": bigint;
    verified: boolean;
  }>;
  innerReadSlice: (
    chunk_size: number | bigint,
    input: {
      acc: Buffer;
      buffer: Buffer;
      index: bigint;
      remaining: bigint;
    }
  ) => Promise<{
    acc: Buffer;
    buffer: Buffer;
    index: bigint;
    remaining: bigint;
  }>;
  innerReadSlice1024: (
    ignored: boolean,
    input: {
      acc: Buffer;
      data: Buffer;
      index: bigint;
    }
  ) => Promise<{
    acc: Buffer;
    data: Buffer;
    index: bigint;
  }>;
  isBitSet: (val: number | bigint, bit: number | bigint) => Promise<boolean>;
  parseBlockHeader: (headerbuff: Buffer) => Promise<
    ClarityTypes.Response<
      {
        "merkle-root": Buffer;
        nbits: bigint;
        nonce: bigint;
        parent: Buffer;
        timestamp: bigint;
        version: bigint;
      },
      bigint
    >
  >;
  parseTx: (tx: Buffer) => Promise<
    ClarityTypes.Response<
      {
        ins: {
          outpoint: {
            hash: Buffer;
            index: bigint;
          };
          scriptSig: Buffer;
          sequence: bigint;
        }[];
        locktime: bigint;
        outs: {
          scriptPubKey: Buffer;
          value: bigint;
        }[];
        version: bigint;
      },
      bigint
    >
  >;
  readHashslice: (oldCtx: { index: bigint; txbuff: Buffer }) => Promise<
    ClarityTypes.Response<
      {
        ctx: {
          index: bigint;
          txbuff: Buffer;
        };
        hashslice: Buffer;
      },
      bigint
    >
  >;
  readNextTxin: (
    ignored: boolean,
    stateRes: ClarityTypes.Response<
      {
        ctx: {
          index: bigint;
          txbuff: Buffer;
        };
        remaining: bigint;
        txins: {
          outpoint: {
            hash: Buffer;
            index: bigint;
          };
          scriptSig: Buffer;
          sequence: bigint;
        }[];
      },
      bigint
    >
  ) => Promise<
    ClarityTypes.Response<
      {
        ctx: {
          index: bigint;
          txbuff: Buffer;
        };
        remaining: bigint;
        txins: {
          outpoint: {
            hash: Buffer;
            index: bigint;
          };
          scriptSig: Buffer;
          sequence: bigint;
        }[];
      },
      bigint
    >
  >;
  readNextTxout: (
    ignored: boolean,
    stateRes: ClarityTypes.Response<
      {
        ctx: {
          index: bigint;
          txbuff: Buffer;
        };
        remaining: bigint;
        txouts: {
          scriptPubKey: Buffer;
          value: bigint;
        }[];
      },
      bigint
    >
  ) => Promise<
    ClarityTypes.Response<
      {
        ctx: {
          index: bigint;
          txbuff: Buffer;
        };
        remaining: bigint;
        txouts: {
          scriptPubKey: Buffer;
          value: bigint;
        }[];
      },
      bigint
    >
  >;
  readSlice: (
    data: Buffer,
    offset: number | bigint,
    size: number | bigint
  ) => Promise<ClarityTypes.Response<Buffer, bigint>>;
  readSlice1: (input: { data: Buffer; index: bigint }) => Promise<Buffer>;
  readSlice128: (input: { data: Buffer; index: bigint }) => Promise<Buffer>;
  readSlice16: (input: { data: Buffer; index: bigint }) => Promise<Buffer>;
  readSlice2: (input: { data: Buffer; index: bigint }) => Promise<Buffer>;
  readSlice256: (input: { data: Buffer; index: bigint }) => Promise<Buffer>;
  readSlice32: (input: { data: Buffer; index: bigint }) => Promise<Buffer>;
  readSlice4: (input: { data: Buffer; index: bigint }) => Promise<Buffer>;
  readSlice512: (input: { data: Buffer; index: bigint }) => Promise<Buffer>;
  readSlice64: (input: { data: Buffer; index: bigint }) => Promise<Buffer>;
  readSlice8: (input: { data: Buffer; index: bigint }) => Promise<Buffer>;
  readTxins: (ctx: { index: bigint; txbuff: Buffer }) => Promise<
    ClarityTypes.Response<
      {
        ctx: {
          index: bigint;
          txbuff: Buffer;
        };
        remaining: bigint;
        txins: {
          outpoint: {
            hash: Buffer;
            index: bigint;
          };
          scriptSig: Buffer;
          sequence: bigint;
        }[];
      },
      bigint
    >
  >;
  readTxouts: (ctx: { index: bigint; txbuff: Buffer }) => Promise<
    ClarityTypes.Response<
      {
        ctx: {
          index: bigint;
          txbuff: Buffer;
        };
        remaining: bigint;
        txouts: {
          scriptPubKey: Buffer;
          value: bigint;
        }[];
      },
      bigint
    >
  >;
  readUint16: (ctx: { index: bigint; txbuff: Buffer }) => Promise<
    ClarityTypes.Response<
      {
        ctx: {
          index: bigint;
          txbuff: Buffer;
        };
        uint16: bigint;
      },
      bigint
    >
  >;
  readUint32: (ctx: { index: bigint; txbuff: Buffer }) => Promise<
    ClarityTypes.Response<
      {
        ctx: {
          index: bigint;
          txbuff: Buffer;
        };
        uint32: bigint;
      },
      bigint
    >
  >;
  readUint64: (ctx: { index: bigint; txbuff: Buffer }) => Promise<
    ClarityTypes.Response<
      {
        ctx: {
          index: bigint;
          txbuff: Buffer;
        };
        uint64: bigint;
      },
      bigint
    >
  >;
  readVarint: (ctx: { index: bigint; txbuff: Buffer }) => Promise<
    ClarityTypes.Response<
      {
        ctx: {
          index: bigint;
          txbuff: Buffer;
        };
        varint: bigint;
      },
      bigint
    >
  >;
  readVarslice: (oldCtx: { index: bigint; txbuff: Buffer }) => Promise<
    ClarityTypes.Response<
      {
        ctx: {
          index: bigint;
          txbuff: Buffer;
        };
        varslice: Buffer;
      },
      bigint
    >
  >;
  reverseBuff32: (input: Buffer) => Promise<Buffer>;
  verifyBlockHeader: (
    headerbuff: Buffer,
    expectedBlockHeight: number | bigint
  ) => Promise<boolean>;
  verifyMerkleProof: (
    reversedTxid: Buffer,
    merkleRoot: Buffer,
    proof: {
      hashes: Buffer[];
      "tree-depth": bigint;
      "tx-index": bigint;
    }
  ) => Promise<ClarityTypes.Response<boolean, bigint>>;
  wasTxMined: (
    block: {
      height: bigint;
      "merkle-root": Buffer;
      nbits: Buffer;
      nonce: Buffer;
      parent: Buffer;
      timestamp: Buffer;
      version: Buffer;
    },
    tx: Buffer,
    proof: {
      hashes: Buffer[];
      "tree-depth": bigint;
      "tx-index": bigint;
    }
  ) => Promise<ClarityTypes.Response<boolean, bigint>>;
  wasTxMinedCompact: (
    block: {
      header: Buffer;
      height: bigint;
    },
    tx: Buffer,
    proof: {
      hashes: Buffer[];
      "tree-depth": bigint;
      "tx-index": bigint;
    }
  ) => Promise<ClarityTypes.Response<boolean, bigint>>;
  BUFF_TO_BYTE: () => Promise<Buffer[]>;
  ERRBADHEADER: () => Promise<bigint>;
  ERROUTOFBOUNDS: () => Promise<bigint>;
  ERRPROOFTOOSHORT: () => Promise<bigint>;
  ERRTOOMANYTXINS: () => Promise<bigint>;
  ERRTOOMANYTXOUTS: () => Promise<bigint>;
  ERRVARSLICETOOLONG: () => Promise<bigint>;
  LIST_128: () => Promise<boolean[]>;
  LIST_16: () => Promise<boolean[]>;
  LIST_256: () => Promise<boolean[]>;
  LIST_32: () => Promise<boolean[]>;
  LIST_512: () => Promise<boolean[]>;
  LIST_64: () => Promise<boolean[]>;
}
