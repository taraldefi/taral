import { NativeClarityBinProvider } from "@blockstack/clarity";
import { TestUtilsProvider } from "../../lib/providers/test-utils-provider";
import { contracts as arkadikoContracts } from "../../generated/external/arkadiko";

import {
  contracts as taralContracts,
  TaralCoinContract,
} from "../../generated/taral";
import {
  ClarinetAccounts,
  getClarinetAccounts,
  getDefaultClarityBin,
} from "../../lib";
import { TestProvider } from "../../lib/providers/test-provider";

export let talToken: TaralCoinContract;
export let clarinetAccounts: ClarinetAccounts;
export let clarityBin: NativeClarityBinProvider;
export let testUtilsProvider: TestUtilsProvider;

beforeAll(async () => {
  jest.setTimeout(3000000);

  const cwd = `${process.cwd()}/clarity/`;
  clarinetAccounts = await getClarinetAccounts(cwd);
  clarityBin = await getDefaultClarityBin(clarinetAccounts);

  testUtilsProvider = await TestUtilsProvider.ensureTestContracts(clarityBin);
  await TestProvider.fromContracts(true, arkadikoContracts, clarityBin);

  const deployed = await TestProvider.fromContracts(
    true,
    taralContracts,
    clarityBin
  );

  talToken = deployed.taralCoin.contract;
});
