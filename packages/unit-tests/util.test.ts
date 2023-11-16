import { getBlockHeight, mineBlocks } from "lib-testing";
import { clarityBin } from "./jest-setup";

test("Can get block height and mine blocks", async () => {
  const startHeight: number = await getBlockHeight(clarityBin);
  await mineBlocks(5, clarityBin);
  expect(await getBlockHeight(clarityBin)).toEqual(
    BigInt(startHeight) + BigInt(5),
  );
}, 3000000);
