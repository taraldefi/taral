import { TestProvider } from "lib-testing";
import { nodeTaralContracts } from "taral-contracts";
import { clarinetAccounts, clarityBin } from "./jest-setup";

test("Test that we can access the token without deploying", async () => {
  const taralCoinInfo = nodeTaralContracts.nodeTaralCoin;
  const contractInfo = await TestProvider.fromContracts(
    false,
    {
      taralCoinInfo,
    },
    clarityBin,
  );

  const contract = contractInfo.taralCoinInfo.contract;

  const token = contract(clarinetAccounts.deployer);

  const result = (await token.getDecimals())._unsafeUnwrap();

  expect(result).toEqual(6n);
}, 3000000);
