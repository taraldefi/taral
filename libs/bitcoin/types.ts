export interface BitcoinTransaction {
    txid: string;
    hash: string;
    version: number;
    size: number;
    vsize: number;
    weight: number;
    locktime: number;
    vin?: VinEntity[] | null;
    vout?: VoutEntity[] | null;
    hex: string;
    blockhash: string;
    confirmations: number;
    time: number;
    blocktime: number;
}

export interface VinEntity {
    txid: string;
    vout: number;
    scriptSig: ScriptSig;
    sequence: number;
}

export interface ScriptSig {
    asm: string;
    hex: string;
}

export interface VoutEntity {
    value: number;
    n: number;
    scriptPubKey: ScriptPubKey;
}

export interface ScriptPubKey {
    asm: string;
    hex: string;
    reqSigs: number;
    type: string;
    addresses?: string[] | null;
}

export interface TxOutSet {
    bestblock: string;
    height: number;
    success: boolean;
    total_amount: number;
    txouts: number;
    unspents: TxOutUnspent[];
}

export interface TxOutUnspent {
    amount: number;
    desc: string;
    height: number;
    scriptPubKey: string;
    txid: string;
    vout: number;
}

export interface GetRawTxResult {
    txid: string;
    hex: string;
    blockhash: string;
    vin: {
        txid: string;
        vout: number;
        scriptSig: {
            asm: string;
            hex: string;
        };
        sequence: number;
    }[];
    vout: {
        n: number;
        value: number;
        scriptPubKey: {
            addresses: string[];
            asm: string;
            hex: string;
            reqSigs: number;
            type: string; // 'pubkeyhash'
        };
    }[];
}

export interface PaymentResponse {
    txId: string;
    rawTx: string;
    txFee: number;
}

export interface ScriptSig {
    asm: string;
    hex: string;
}

export interface Vin {
    coinbase: string;
    txinwitness: string[];
    sequence: any;
    txid: string;
    vout?: number;
    scriptSig: ScriptSig;
}

export interface Vout {
    value: number;
    n: number;
    scriptPubKey: ScriptPubKey;
}

export interface Tx {
    txid: string;
    hash: string;
    version: number;
    size: number;
    vsize: number;
    weight: number;
    locktime: number;
    vin: Vin[];
    vout: Vout[];
    hex: string;
}

export interface Block {
    hash: string;
    confirmations: number;
    strippedsize: number;
    size: number;
    weight: number;
    height: number;
    version: number;
    versionHex: string;
    merkleroot: string;
    tx: Tx[];
    time: number;
    mediantime: number;
    nonce: number;
    bits: string;
    difficulty: number;
    chainwork: string;
    nTx: number;
    previousblockhash: string;
    nextblockhash: string;
}
