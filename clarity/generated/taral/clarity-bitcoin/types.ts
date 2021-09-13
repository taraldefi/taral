import { ClarityTypes } from "../../../lib/clarity/types";
import { IMetadata } from "../../../lib/providers/types";

// prettier-ignore

export interface ClarityBitcoinContract {
    buffToU8: (byte: Buffer, metadata: IMetadata) => Promise<number>;
    concatHeader: (block: {
        "height": number;
        "merkle-root": Buffer;
        "nbits": Buffer;
        "nonce": Buffer;
        "parent": Buffer;
        "timestamp": Buffer;
        "version": Buffer
    }, metadata: IMetadata) => Promise<Buffer>;
    concatIn: (inVariable: {
        "outpoint": {
            "hash": Buffer;
            "index": Buffer
        };
        "scriptSig": Buffer;
        "sequence": Buffer
    }, result: Buffer, metadata: IMetadata) => Promise<Buffer>;
    concatIns: (ins: {
        "outpoint": {
            "hash": Buffer;
            "index": Buffer
        };
        "scriptSig": Buffer;
        "sequence": Buffer
    }[], metadata: IMetadata) => Promise<Buffer>;
    concatOut: (out: {
        "scriptPubKey": Buffer;
        "value": Buffer
    }, result: Buffer, metadata: IMetadata) => Promise<Buffer>;
    concatOuts: (outs: {
        "scriptPubKey": Buffer;
        "value": Buffer
    }[], metadata: IMetadata) => Promise<Buffer>;
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
    }, metadata: IMetadata) => Promise<Buffer>;
    concatVar: (buffer: Buffer, metadata: IMetadata) => Promise<Buffer>;
    getBcHHash: (bh: number, metadata: IMetadata) => Promise<Buffer | null>;
    getReversedTxid: (tx: Buffer, metadata: IMetadata) => Promise<Buffer>;
    getTxid: (tx: Buffer, metadata: IMetadata) => Promise<Buffer>;
    innerBuff32Permutation: (targetIndex: number, state: {
        "hash-input": Buffer;
        "hash-output": Buffer
    }, metadata: IMetadata) => Promise<{
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
    }, metadata: IMetadata) => Promise<{
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
    }, metadata: IMetadata) => Promise<{
        "acc": Buffer;
        "buffer": Buffer;
        "index": number;
        "remaining": number
    }>;
    innerReadSlice1024: (ignored: boolean, input: {
        "acc": Buffer;
        "data": Buffer;
        "index": number
    }, metadata: IMetadata) => Promise<{
        "acc": Buffer;
        "data": Buffer;
        "index": number
    }>;
    isBitSet: (val: number, bit: number, metadata: IMetadata) => Promise<boolean>;
    parseBlockHeader: (headerbuff: Buffer, metadata: IMetadata) => Promise<ClarityTypes.Response<{
        "merkle-root": Buffer;
        "nbits": number;
        "nonce": number;
        "parent": Buffer;
        "timestamp": number;
        "version": number
    }, number>>;
    parseTx: (tx: Buffer, metadata: IMetadata) => Promise<ClarityTypes.Response<{
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
    }, metadata: IMetadata) => Promise<ClarityTypes.Response<{
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
    }, number>, metadata: IMetadata) => Promise<ClarityTypes.Response<{
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
    }, number>, metadata: IMetadata) => Promise<ClarityTypes.Response<{
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
    readSlice: (data: Buffer, offset: number, size: number, metadata: IMetadata) => Promise<ClarityTypes.Response<Buffer, number>>;
    readSlice1: (input: {
        "data": Buffer;
        "index": number
    }, metadata: IMetadata) => Promise<Buffer>;
    readSlice128: (input: {
        "data": Buffer;
        "index": number
    }, metadata: IMetadata) => Promise<Buffer>;
    readSlice16: (input: {
        "data": Buffer;
        "index": number
    }, metadata: IMetadata) => Promise<Buffer>;
    readSlice2: (input: {
        "data": Buffer;
        "index": number
    }, metadata: IMetadata) => Promise<Buffer>;
    readSlice256: (input: {
        "data": Buffer;
        "index": number
    }, metadata: IMetadata) => Promise<Buffer>;
    readSlice32: (input: {
        "data": Buffer;
        "index": number
    }, metadata: IMetadata) => Promise<Buffer>;
    readSlice4: (input: {
        "data": Buffer;
        "index": number
    }, metadata: IMetadata) => Promise<Buffer>;
    readSlice512: (input: {
        "data": Buffer;
        "index": number
    }, metadata: IMetadata) => Promise<Buffer>;
    readSlice64: (input: {
        "data": Buffer;
        "index": number
    }, metadata: IMetadata) => Promise<Buffer>;
    readSlice8: (input: {
        "data": Buffer;
        "index": number
    }, metadata: IMetadata) => Promise<Buffer>;
    readTxins: (ctx: {
        "index": number;
        "txbuff": Buffer
    }, metadata: IMetadata) => Promise<ClarityTypes.Response<{
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
    }, metadata: IMetadata) => Promise<ClarityTypes.Response<{
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
    }, metadata: IMetadata) => Promise<ClarityTypes.Response<{
        "ctx": {
            "index": number;
            "txbuff": Buffer
        };
        "uint16": number
    }, number>>;
    readUint32: (ctx: {
        "index": number;
        "txbuff": Buffer
    }, metadata: IMetadata) => Promise<ClarityTypes.Response<{
        "ctx": {
            "index": number;
            "txbuff": Buffer
        };
        "uint32": number
    }, number>>;
    readUint64: (ctx: {
        "index": number;
        "txbuff": Buffer
    }, metadata: IMetadata) => Promise<ClarityTypes.Response<{
        "ctx": {
            "index": number;
            "txbuff": Buffer
        };
        "uint64": number
    }, number>>;
    readVarint: (ctx: {
        "index": number;
        "txbuff": Buffer
    }, metadata: IMetadata) => Promise<ClarityTypes.Response<{
        "ctx": {
            "index": number;
            "txbuff": Buffer
        };
        "varint": number
    }, number>>;
    readVarslice: (oldCtx: {
        "index": number;
        "txbuff": Buffer
    }, metadata: IMetadata) => Promise<ClarityTypes.Response<{
        "ctx": {
            "index": number;
            "txbuff": Buffer
        };
        "varslice": Buffer
    }, number>>;
    reverseBuff32: (input: Buffer, metadata: IMetadata) => Promise<Buffer>;
    verifyBlockHeader: (headerbuff: Buffer, expectedBlockHeight: number, metadata: IMetadata) => Promise<boolean>;
    verifyMerkleProof: (reversedTxid: Buffer, merkleRoot: Buffer, proof: {
        "hashes": Buffer[];
        "tree-depth": number;
        "tx-index": number
    }, metadata: IMetadata) => Promise<ClarityTypes.Response<boolean, number>>;
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
    }, metadata: IMetadata) => Promise<ClarityTypes.Response<boolean, number>>;
    wasTxMinedCompact: (block: {
        "header": Buffer;
        "height": number
    }, tx: Buffer, proof: {
        "hashes": Buffer[];
        "tree-depth": number;
        "tx-index": number
    }, metadata: IMetadata) => Promise<ClarityTypes.Response<boolean, number>>;
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
