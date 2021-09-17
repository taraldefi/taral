import { deserializeCV } from "@stacks/transactions";
import { evalJson, executeJson } from "../adapter";
import { cvToValue } from "../clarity";
import { NativeClarityBinProvider } from "../native-cli/native-provider";

// maybe it's worth using the clarinet accounts here in the future?
//
const UTIL_CONTRACT_ID = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.test-utils";

export async function getBlockHeight(provider: NativeClarityBinProvider) {
    const { output_serialized } = await evalJson({
        contractAddress: UTIL_CONTRACT_ID,
        functionName: "get-block-height",
        args: [],
        provider,
    });
    const outputCV = deserializeCV(Buffer.from(output_serialized, "hex"));
    const blockHeight: number = cvToValue(outputCV);
    return blockHeight;
}

export async function getStxBalance(
    provider: NativeClarityBinProvider,
    account: string
) {
    const { output_serialized } = await evalJson({
        contractAddress: UTIL_CONTRACT_ID,
        functionName: "get-stx-balance",
        args: [`'${account}`],
        provider,
    });
    const outputCV = deserializeCV(Buffer.from(output_serialized, "hex"));
    const balance: number = cvToValue(outputCV);
    return balance;
}

export async function mineBlock(provider: NativeClarityBinProvider) {
    await executeJson({
        contractAddress: UTIL_CONTRACT_ID,
        functionName: "mine-block",
        args: [],
        provider,
        senderAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    });
}

export async function mineBlocks(
    blocks: number,
    provider: NativeClarityBinProvider
) {
    for (let index = 0; index < blocks; index++) {
        await mineBlock(provider);
    }
}
