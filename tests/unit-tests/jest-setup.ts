import { TestProvider } from "../../shared/providers/test-provider";
import { contracts } from "../../src";

import { TaralCoinContract } from "../../src";

export let talToken: TaralCoinContract;

beforeAll(async () => {
  console.log("Running deploy beforeall");
  jest.setTimeout(3000000);
  const deployed = await TestProvider.fromContracts(contracts);
  talToken = deployed.taralCoin.contract;
  console.log("deployedddd");
});
