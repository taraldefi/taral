import { NativeClarityBinProvider } from "lib-clarity-bin";
import {

  getRootDirectory,
} from "lib-shared";
import { getDefaultClarityBin, TestProvider } from "lib-testing";
import {
  nodeArkadikoContracts,
  nodeTaralContracts,
  TaralCoinContract,
  TestUtilsProvider,
} from "taral-contracts";

import {
  ClarinetAccount,
  ClarinetAccounts,
  getClarinetAccounts,
} from "lib-infra";

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
  await TestProvider.fromContracts(true, nodeArkadikoContracts, clarityBin);

  const deployed = await TestProvider.fromContracts(
    true,
    nodeTaralContracts,
    clarityBin
  );

  talToken = deployed.nodeTaralCoin.contract;
}, 3000000);
