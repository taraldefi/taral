import { RPCClient } from "rpc-bitcoin";

export async function getBlockByHash(rpcClient: RPCClient, blockHash: string): Promise<Block> {
    var blockByHash = await rpcClient.getblock({
        blockhash: blockHash,
        verbosity: 2
    });

    return blockByHash;
}

export async function getBlockHeader(rpcClient: RPCClient, blockHash: string): Promise<any> {
    var blockHeader = await rpcClient.getblockheader({
        blockhash: blockHash,
        verbose: false
    });

    return blockHeader;
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
export interface ScriptPubKey {
    asm: string;
    hex: string;
    reqSigs: number;
    type: string;
    addresses: string[];
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