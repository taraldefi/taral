import { ClarinetAccounts, getClarinetAccounts } from "../../shared/configuration";
import { TestProvider } from "../../shared/providers/test-provider";
import { contracts } from "../../src";

import { TaralCoinContract } from "../../src";

export let talToken: TaralCoinContract;
export let clarinetAccounts: ClarinetAccounts;

beforeAll(async () => {
  jest.setTimeout(3000000);

  const cwd = process.cwd();
  clarinetAccounts = await getClarinetAccounts(cwd);
  const deployed = await TestProvider.fromContracts(contracts);
  talToken = deployed.taralCoin.contract;
});
