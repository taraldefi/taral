import { txOk } from "../../lib";
import { clarinetAccounts, talToken } from "./jest-setup";
import { getTestContext } from "./utils";

test("Should have the correct token uri", async () => {
  var testContext = getTestContext();
  //todo: might need to rely on real wallets here (the ones that are created) and not the ones we created for testing w/clarinet.
  var result = await txOk(
    talToken(clarinetAccounts.deployer).getTokenUri(testContext.metadata),
    testContext.metadata.sender
  );

  expect(result.value).toBe("https://taraldefi.github.io");
});

test("Ticker should be TAL", async () => {
  var testContext = getTestContext();
  var result = (
    await talToken(clarinetAccounts.deployer).getSymbol(testContext.metadata)
  )._unsafeUnwrap();
  expect(result).toBe("TAL");
});

test("Decimals should be 6", async () => {
  var testContext = getTestContext();
  const result = (
    await talToken(clarinetAccounts.deployer).getDecimals(testContext.metadata)
  )._unsafeUnwrap();
  expect(result).toEqual(6);
});
