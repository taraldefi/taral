import { NO_METADATA } from "../../lib/providers";
import { talToken } from "./jest-setup";

test("Should be named TARAL", async () => {
  const result = await (await talToken.getName(NO_METADATA))._unsafeUnwrap();
  expect(result).toBe("TARAL");
});

test("Ticker should be TAL", async () => {
  const result = (await talToken.getSymbol(NO_METADATA))._unsafeUnwrap();
  expect(result).toBe("TAL");
});

test("Decimals should be 6", async () => {
  const result = (await talToken.getDecimals(NO_METADATA))._unsafeUnwrap();
  expect(result).toEqual(6);
});
