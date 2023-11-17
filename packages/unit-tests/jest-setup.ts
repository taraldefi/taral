import { NativeClarityBinProvider } from "lib-clarity-bin";
import { getClarinetAccounts } from "lib-infra";
import {
  ClarinetAccount,
  ClarinetAccounts,
  getRootDirectory,
} from "lib-shared";
import {
  getDefaultClarityBin,
  TestProvider,
  TestUtilsProvider,
} from "lib-testing";
import {
  nodeTaralContracts,
  TaralCoinContract,
  TaralOracleContract,
  StorageServiceContract,
  TaralExporterV1Contract,
} from "taral-contracts";

export let talToken: (caller: ClarinetAccount) => TaralCoinContract;
export let taralOracle: (caller: ClarinetAccount) => TaralOracleContract;
export let storageService: (caller: ClarinetAccount) => StorageServiceContract;
export let taralExporter: (caller: ClarinetAccount) => TaralExporterV1Contract;

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

  const deployed = await TestProvider.fromContracts(
    true,
    nodeTaralContracts,
    clarityBin,
  );

  talToken = deployed.nodeTaralCoin.contract;
  taralOracle = deployed.nodeTaralOracle.contract;
  storageService = deployed.nodeStorageService.contract;
  taralExporter = deployed.nodeTaralExporterV1.contract;
}, 3000000);
