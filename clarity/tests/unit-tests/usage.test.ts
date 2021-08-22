import { taralCoinInfo } from "../../generated/taral/taral-coin";
import { NO_METADATA, TestProvider } from "../../lib/providers";
import { clarityBin } from "./jest-setup";

test("Test that we can access the token without deploying", async () => {
  var contractInfo = await TestProvider.fromContracts(
    false,
    {
      taralCoinInfo,
    },
    clarityBin
  );

  var contract = contractInfo.taralCoinInfo.contract;

  const result = (await contract.getDecimals(NO_METADATA))._unsafeUnwrap();

  expect(result).toEqual(6);
});
