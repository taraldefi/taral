import { getBlockHeight, mineBlocks } from "taral-shared";
import { clarityBin } from "./jest-setup";

test("Can get block height and mine blocks", async () => {
  const startHeight = await getBlockHeight(clarityBin);
  expect(startHeight).toEqual(54n);
  await mineBlocks(5, clarityBin);
  expect(await getBlockHeight(clarityBin)).toEqual(59n);
}, 3000000);
