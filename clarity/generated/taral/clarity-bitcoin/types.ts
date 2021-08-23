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
    concatIn: (inin: {
    "outpoint": {
        "hash": Buffer;
        "index": Buffer
    };
    "scriptSig": Buffer;
    "sequence": Buffer;
}, result: Buffer, metadata: IMetadata) => Promise<Buffer>;
concatIns: () => Promise<Buffer>;
concatOut: () => Promise<Buffer>;
concatOuts: () => Promise<Buffer>;
concatTx: () => Promise<Buffer>;
concatVar: () => Promise<Buffer>;
getBcHHash: () => Promise<Buffer | null>;
getReversedTxid: () => Promise<Buffer>;
getTxid: () => Promise<Buffer>;
innerBuff32Permutation: () => Promise<{
    "hash-input": Buffer;
    "hash-output": Buffer
}>;
innerMerkleProofVerify: () => Promise<{
    "cur-hash": Buffer;
    "path": number;
    "proof-hashes": Buffer[];
    "root-hash": Buffer;
    "tree-depth": number;
    "verified": boolean
}>;
innerReadSlice: () => Promise<{
    "acc": Buffer;
    "buffer": Buffer;
    "index": number;
    "remaining": number
}>;
innerReadSlice1024: () => Promise<{
    "acc": Buffer;
    "data": Buffer;
    "index": number
}>;
isBitSet: () => Promise<boolean>;
parseBlockHeader: () => Promise<ClarityTypes.Response<{
    "merkle-root": Buffer;
    "nbits": number;
    "nonce": number;
    "parent": Buffer;
    "timestamp": number;
    "version": number
}, number>>;
parseTx: () => Promise<ClarityTypes.Response<{
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
readHashslice: () => Promise<ClarityTypes.Response<{
    "ctx": {
        "index": number;
        "txbuff": Buffer
    };
    "hashslice": Buffer
}, number>>;
readNextTxin: () => Promise<ClarityTypes.Response<{
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
readNextTxout: () => Promise<ClarityTypes.Response<{
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
readSlice: () => Promise<ClarityTypes.Response<Buffer, number>>;
readSlice1: () => Promise<Buffer>;
readSlice128: () => Promise<Buffer>;
readSlice16: () => Promise<Buffer>;
readSlice2: () => Promise<Buffer>;
readSlice256: () => Promise<Buffer>;
readSlice32: () => Promise<Buffer>;
readSlice4: () => Promise<Buffer>;
readSlice512: () => Promise<Buffer>;
readSlice64: () => Promise<Buffer>;
readSlice8: () => Promise<Buffer>;
readTxins: () => Promise<ClarityTypes.Response<{
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
readTxouts: () => Promise<ClarityTypes.Response<{
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
readUint16: () => Promise<ClarityTypes.Response<{
    "ctx": {
        "index": number;
        "txbuff": Buffer
    };
    "uint16": number
}, number>>;
readUint32: () => Promise<ClarityTypes.Response<{
    "ctx": {
        "index": number;
        "txbuff": Buffer
    };
    "uint32": number
}, number>>;
readUint64: () => Promise<ClarityTypes.Response<{
    "ctx": {
        "index": number;
        "txbuff": Buffer
    };
    "uint64": number
}, number>>;
readVarint: () => Promise<ClarityTypes.Response<{
    "ctx": {
        "index": number;
        "txbuff": Buffer
    };
    "varint": number
}, number>>;
readVarslice: () => Promise<ClarityTypes.Response<{
    "ctx": {
        "index": number;
        "txbuff": Buffer
    };
    "varslice": Buffer
}, number>>;
reverseBuff32: () => Promise<Buffer>;
verifyBlockHeader: () => Promise<boolean>;
verifyMerkleProof: () => Promise<ClarityTypes.Response<boolean, number>>;
wasTxMined: () => Promise<ClarityTypes.Response<boolean, number>>;
wasTxMinedCompact: () => Promise<ClarityTypes.Response<boolean, number>>;
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
