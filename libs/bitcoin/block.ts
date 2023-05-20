import { Logger } from "lib-shared";
import { RPCClient } from "rpc-bitcoin";
import { Block } from ".";

export async function getBlockByHash(
    rpcClient: RPCClient,
    blockHash: string
): Promise<Block> {
    const blockByHash = await rpcClient.getblock({
        blockhash: blockHash,
        verbosity: 2,
    });

    Logger.debug("get-block-by-hash", "Received result ", blockByHash);

    return blockByHash;
}

export async function getBlockHeader(
    rpcClient: RPCClient,
    blockHash: string
): Promise<string> {
    const blockHeader = await rpcClient.getblockheader({
        blockhash: blockHash,
        verbose: false,
    });

    Logger.debug("get-block-header-by-hash", "Received result ", blockHeader);

    return blockHeader as string;
}
