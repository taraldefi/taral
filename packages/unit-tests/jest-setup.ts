import { NativeClarityBinProvider } from "lib-clarity-bin";
import {
  ClarinetAccount,
  ClarinetAccounts,
  getClarinetAccounts,
  getRootDirectory,
} from "lib-shared";
import { 
  TestProvider, 
  getDefaultClarityBin,
} from "lib-testing";
import {
  arkadikoContracts,
  TaralCoinContract,
  taralContracts,
  TestUtilsProvider,
} from "taral-generated-contracts";

export let talToken: (caller: ClarinetAccount) => TaralCoinContract;
export let clarinetAccounts: ClarinetAccounts;
export let deployer: ClarinetAccount;
export let clarityBin: NativeClarityBinProvider;
export let testUtilsProvider: TestUtilsProvider;

beforeAll(async () => {
  const root = `${getRootDirectory()}/packages/clarity`;
  clarinetAccounts = await getClarinetAccounts(root);
  deployer = clarinetAccounts.deployer;

  clarityBin = await getDefaultClarityBin(clarinetAccounts);

  testUtilsProvider = await TestUtilsProvider.ensureTestContracts(clarityBin);
  await TestProvider.fromContracts(true, arkadikoContracts, clarityBin);

  const deployed = await TestProvider.fromContracts(
    true,
    taralContracts,
    clarityBin
  );

  talToken = deployed.taralCoin.contract;
}, 3000000);
