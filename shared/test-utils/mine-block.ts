import { NativeClarityBinProvider } from "@blockstack/clarity";
import { UTIL_CONTRACT_ID } from ".";
import { executeJson } from "../adapter";

export async function mineBlock(provider: NativeClarityBinProvider) {
    await executeJson({
        contractAddress: UTIL_CONTRACT_ID,
        functionName: "mine-block",
        args: [],
        provider,
        senderAddress: "ST000000000000000000002AMW42H",
    });
}
