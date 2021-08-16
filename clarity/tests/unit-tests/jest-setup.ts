import { contracts as arkadikoContracts } from "../../generated/external/arkadiko";
import { contracts as coreContracts } from "../../generated/external/core";
import {
  contracts as taralContracts,
  TaralCoinContract,
} from "../../generated/taral";
import {
  contracts as testUtilsContracts,
  TestUtilsContract,
} from "../../generated/test-utils";
import {
  ClarinetAccounts,
  getClarinetAccounts,
  getDefaultClarityBin,
} from "../../lib";
import { TestProvider } from "../../lib/providers/test-provider";

export let talToken: TaralCoinContract;
export let testToken: TestUtilsContract;
export let clarinetAccounts: ClarinetAccounts;

beforeAll(async () => {
  jest.setTimeout(3000000);

  const cwd = `${process.cwd()}/clarity/`;
  clarinetAccounts = await getClarinetAccounts(cwd);
  const clarityBin = await getDefaultClarityBin(clarinetAccounts);

  var deployedTestUtils = await TestProvider.fromContracts(
    testUtilsContracts,
    clarityBin
  );
  testToken = deployedTestUtils.testUtils.contract;

  await TestProvider.fromContracts(coreContracts, clarityBin);
  await TestProvider.fromContracts(arkadikoContracts, clarityBin);
  const deployed = await TestProvider.fromContracts(taralContracts, clarityBin);
  talToken = deployed.taralCoin.contract;
});
