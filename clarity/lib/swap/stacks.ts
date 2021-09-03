import { BlocksApi, Configuration } from "@stacks/blockchain-api-client";
import { Logger } from "../logger";
import { NETWORK } from "../../configuration";

export async function getStxBlock(bitcoinBlockHeight: number) {

    let limit = 30;
    let offset = 0;

    const blocksApi = getBlocksApi();

    const firstResponse = await blocksApi.getBlockList({ offset, limit });

    const lastBlock = firstResponse.results[0];

    Logger.debug(`Last block: ${JSON.stringify(lastBlock)}`)

    let stxBlock = firstResponse.results.find(b => b.burn_block_height === bitcoinBlockHeight);

    offset += Math.max(limit, firstResponse.results[0].burn_block_height - bitcoinBlockHeight);

    console.log('getStxBlock', { offset });

    while (!stxBlock) {

        const blockListResponse = await blocksApi.getBlockList({ offset, limit });
        const blocks = blockListResponse.results;
        
        stxBlock = blocks.find(b => b.burn_block_height === bitcoinBlockHeight);
        
        offset -= limit;

        const info = { offset };
        
        Logger.debug(`getStxBlock result: ${JSON.stringify(info)}`);
        
        if (offset < 0 || blocks[blocks.length - 1].burn_block_height > bitcoinBlockHeight) {
            return undefined;
        }
    }

    return stxBlock;
}

function getBlocksApi(): BlocksApi {

    const basePath = NETWORK.coreApiUrl;
    
    const configuration = new Configuration({
        basePath
    });

    const blocksApi = new BlocksApi(configuration);

    return blocksApi;
}