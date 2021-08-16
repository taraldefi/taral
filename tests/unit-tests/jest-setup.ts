import { ClarinetAccounts, getClarinetAccounts } from "../../shared/configuration";
import { TestProvider } from "../../shared/providers/test-provider";

import { contracts as coreContracts } from "../../generated/external/core";
import { contracts as arkadikoContracts } from "../../generated/external/arkadiko";
import { contracts as taralContracts } from "../../generated/taral";

import { TaralCoinContract } from "../../generated/taral";
import { getDefaultClarityBin } from "../../shared/adapter";

export let talToken: TaralCoinContract;
export let clarinetAccounts: ClarinetAccounts;

beforeAll(async () => {
  jest.setTimeout(3000000);

  const cwd = process.cwd();
  clarinetAccounts = await getClarinetAccounts(cwd);
  const clarityBin = await getDefaultClarityBin(clarinetAccounts);

  await TestProvider.fromContracts(coreContracts, clarityBin);
  await TestProvider.fromContracts(arkadikoContracts, clarityBin);
  const deployed = await TestProvider.fromContracts(taralContracts, clarityBin);
  talToken = deployed.taralCoin.contract;
});
