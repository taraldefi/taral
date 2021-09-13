// import { txOk } from "../../lib";
// import { talToken } from "./jest-setup";
// import { getTestContext } from "./utils";

// test("Should have the correct token uri", async () => {
//   var testContext = getTestContext();
//   //todo: might need to rely on real wallets here (the ones that are created) and not the ones we created for testing w/clarinet.
//   var result = await txOk(
//     talToken.getTokenUri(testContext.metadata),
//     testContext.metadata.sender
//   );

//   expect(result.value).toBe("https://taraldefi.github.io");
// });

// test("Ticker should be TAL", async () => {
//   var testContext = getTestContext();
//   var result = (
//     await talToken.getSymbol(testContext.metadata)
//   )._unsafeUnwrap();
//   expect(result).toBe("TAL");
// });

// test("Decimals should be 6", async () => {
//   var testContext = getTestContext();
//   const result = (
//     await talToken.getDecimals(testContext.metadata)
//   )._unsafeUnwrap();
//   expect(result).toEqual(6);
// });
