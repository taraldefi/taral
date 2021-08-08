import { NativeClarityBinProvider } from "@blockstack/clarity";
import { mineBlock } from "./mine-block";

export async function mineBlocks(
  blocks: number,
  provider: NativeClarityBinProvider
) {
  for (let index = 0; index < blocks; index++) {
    await mineBlock(provider);
  }
}
