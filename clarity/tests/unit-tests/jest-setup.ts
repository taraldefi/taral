import { NativeClarityBinProvider } from "@blockstack/clarity";
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
export let clarityBin: NativeClarityBinProvider;

beforeAll(async () => {
  jest.setTimeout(3000000);

  const cwd = `${process.cwd()}/clarity/`;
  clarinetAccounts = await getClarinetAccounts(cwd);
  clarityBin = await getDefaultClarityBin(clarinetAccounts);

  var deployedTestUtils = await TestProvider.fromContracts(
    true,
    testUtilsContracts,
    clarityBin
  );

  testToken = deployedTestUtils.testUtils.contract;

  await TestProvider.fromContracts(true, coreContracts, clarityBin);
  await TestProvider.fromContracts(true, arkadikoContracts, clarityBin);
  
  const deployed = await TestProvider.fromContracts(true, taralContracts, clarityBin);
  
  talToken = deployed.taralCoin.contract;
});
