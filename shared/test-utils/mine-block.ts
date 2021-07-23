import { NativeClarityBinProvider } from "@blockstack/clarity";
import { executeJson } from "../adapter";
import { UTIL_CONTRACT_ID } from ".";

export async function mineBlock(provider: NativeClarityBinProvider) {
  await executeJson({
    contractAddress: UTIL_CONTRACT_ID,
    functionName: "mine-block",
    args: [],
    provider,
    senderAddress: "ST000000000000000000002AMW42H",
  });
}
