import {
  arkadikoContracts,
  TaralCoinContract,
  taralContracts,
  TestUtilsProvider,
} from "taral-generated-contracts";
import {
  ClarinetAccount,
  ClarinetAccounts,
  getClarinetAccounts,
  getDefaultClarityBin,
  getRootDirectory,
  NativeClarityBinProvider,
  TestProvider,
} from "taral-shared";

export let talToken: (caller: ClarinetAccount) => TaralCoinContract;
export let clarinetAccounts: ClarinetAccounts;
export let clarityBin: NativeClarityBinProvider;
export let testUtilsProvider: TestUtilsProvider;

beforeAll(async () => {
  jest.setTimeout(3000000);

  const root = `${getRootDirectory()}/packages/clarity`;
  clarinetAccounts = await getClarinetAccounts(root);
  
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
