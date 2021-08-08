import { NativeClarityBinProvider } from "@blockstack/clarity";
import { deserializeCV } from "@stacks/transactions";
import { UTIL_CONTRACT_ID } from ".";
import { evalJson } from "../adapter";
import { cvToValue } from "../clarity";

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
