import { BlocksApi, Configuration } from "@stacks/blockchain-api-client";
import fetch from "cross-fetch";
import { Logger, toJSON } from "lib-shared";
import { NETWORK } from "taral-configuration";

const NAME = "get-stx-block";

export async function getStxBlock(bitcoinBlockHeight: number) {
  let limit = 30;
  let offset = 0;

  const blocksApi = getBlocksApi();

  const firstResponse = await blocksApi.getBlockList({ offset, limit });

  const lastBlock = firstResponse.results[0];

  Logger.debug(NAME, `Last block: ${toJSON(lastBlock)}`);

  let stxBlock = firstResponse.results.find(
    (b: any) => b.burn_block_height === bitcoinBlockHeight
  );

  offset += Math.max(
    limit,
    firstResponse.results[0].burn_block_height - bitcoinBlockHeight
  );

  while (!stxBlock) {
    const blockListResponse = await blocksApi.getBlockList({ offset, limit });
    const blocks = blockListResponse.results;

    stxBlock = blocks.find(
      (b: any) => b.burn_block_height === bitcoinBlockHeight
    );

    offset -= limit;

    if (
      offset < 0 ||
      blocks[blocks.length - 1].burn_block_height > bitcoinBlockHeight
    ) {
      return undefined;
    }
  }

  Logger.debug(NAME, "Received result ", stxBlock);
  return stxBlock;
}

function getBlocksApi(): BlocksApi {
  const basePath = NETWORK.coreApiUrl;

  const configuration = new Configuration({
    basePath,
    fetchApi: fetch,
  });

  const blocksApi = new BlocksApi(configuration);

  return blocksApi;
}
