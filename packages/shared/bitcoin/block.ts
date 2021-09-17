import { RPCClient } from "rpc-bitcoin";
import { Block } from ".";
import { Logger } from "..";

export async function getBlockByHash(
  rpcClient: RPCClient,
  blockHash: string
): Promise<Block> {
  Logger.debug("Calling getblock by blockhash");
  var blockByHash = await rpcClient.getblock({
    blockhash: blockHash,
    verbosity: 2,
  });

  Logger.debug("getblock result");
  Logger.debug(JSON.stringify(blockByHash));
  Logger.debug("---------------");

  return blockByHash;
}

export async function getBlockHeader(
  rpcClient: RPCClient,
  blockHash: string
): Promise<string> {
  Logger.debug("Calling getblockheader by blockhash");
  var blockHeader = await rpcClient.getblockheader({
    blockhash: blockHash,
    verbose: false,
  });

  Logger.debug("getblockheader result");
  Logger.debug(JSON.stringify(blockHeader));
  Logger.debug("---------------");

  return blockHeader as string;
}
