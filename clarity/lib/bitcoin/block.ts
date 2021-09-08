import { RPCClient } from "rpc-bitcoin";

export async function getBlockByHash(rpcClient: RPCClient, blockHash: string): Promise<Block> {
    var blockByHash = await rpcClient.getblock({
        blockhash: blockHash,
        verbosity: 1
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

export interface Block {
    hash: string;
    confirmations: number;
    size: number;
    strippedsize: number;
    weight: number;
    height: number;
    version: number;
    versionHex: string;
    merkleroot: string;
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