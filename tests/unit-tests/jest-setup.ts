import { ClarinetAccounts, getClarinetAccounts } from "../../lib";
import { TestProvider } from "../../lib/providers/test-provider";

import { contracts as coreContracts } from "../../generated/external/core";
import { contracts as arkadikoContracts } from "../../generated/external/arkadiko";
import { contracts as taralContracts } from "../../generated/taral";
import { contracts as testUtilsContracts, TestUtilsContract } from "../../generated/test-utils";

import { TaralCoinContract } from "../../generated/taral";

import { getDefaultClarityBin } from "../../lib";


export let talToken: TaralCoinContract;
export let testToken: TestUtilsContract;
export let clarinetAccounts: ClarinetAccounts;

beforeAll(async () => {
  jest.setTimeout(3000000);

  const cwd = process.cwd();
  clarinetAccounts = await getClarinetAccounts(cwd);
  const clarityBin = await getDefaultClarityBin(clarinetAccounts);

  var deployedTestUtils = await TestProvider.fromContracts(testUtilsContracts, clarityBin);
  testToken = deployedTestUtils.testUtils.contract;

  await TestProvider.fromContracts(coreContracts, clarityBin);
  await TestProvider.fromContracts(arkadikoContracts, clarityBin);
  const deployed = await TestProvider.fromContracts(taralContracts, clarityBin);
  talToken = deployed.taralCoin.contract;
});
