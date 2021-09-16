import { taralCoinInfo } from "../../generated/taral/taral-coin";
import { TestProvider } from "../../lib/providers";
import { clarinetAccounts } from "../integration-tests/jest-setup";
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

  const token = contract(clarinetAccounts.deployer);

  const result = (await token.getDecimals())._unsafeUnwrap();

  expect(result).toEqual(6n);
});
