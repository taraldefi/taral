import { arkadikoContracts } from "taral-generated-contracts";
import {
  taralContracts,
  TaralCoinContract,
} from "taral-generated-contracts";
import {
  ClarinetAccount,
  ClarinetAccounts,
  getClarinetAccounts,
  getDefaultClarityBin,
} from "taral-shared";
import { NativeClarityBinProvider } from "taral-shared";
import { TestProvider } from "taral-shared";
import { TestUtilsProvider } from "taral-generated-contracts";

export let talToken: (caller: ClarinetAccount) => TaralCoinContract;
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
