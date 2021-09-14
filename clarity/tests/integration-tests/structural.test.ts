import { txOk } from "../../lib";
import { clarinetAccounts, talToken } from "./jest-setup";

test("Should have the correct token uri", async () => {
  var result = await txOk(
    talToken(clarinetAccounts.deployer).getTokenUri(),
  );

  expect(result.value).toBe("https://taraldefi.github.io");
});

test("Ticker should be TAL", async () => {
  var result = (
    await talToken(clarinetAccounts.deployer).getSymbol()
  )._unsafeUnwrap();
  expect(result).toBe("TAL");
});

test("Decimals should be 6", async () => {
  const result = (
    await talToken(clarinetAccounts.deployer).getDecimals()
  )._unsafeUnwrap();
  expect(result).toEqual(6);
});
