import { RPCClient } from "rpc-bitcoin";

export async function getBlockByHash(rpcClient: RPCClient, blockHash: string): Promise<any> {
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
