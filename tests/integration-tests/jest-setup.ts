import { StacksNetwork } from "@stacks/network";
import { StacksNetworkConfiguration } from "../../configuration/stacks-network";
import { ClarinetAccounts, getClarinetAccounts } from "../../shared/configuration";
import { Logger } from "../../shared/logger";
import { ApiProvider } from "../../shared/providers";

import { contracts as coreContracts } from "../../generated/external/core";
import { contracts as arkadikoContracts } from "../../generated/external/arkadiko";
import { contracts as taralContracts } from "../../generated/taral";

import { TaralCoinContract } from "../../src";

export const network: StacksNetwork = new StacksNetworkConfiguration();
export let talToken: TaralCoinContract;
export let clarinetAccounts: ClarinetAccounts;

beforeAll(async () => {
  jest.setTimeout(3000000);

  const cwd = process.cwd();
  clarinetAccounts = await getClarinetAccounts(cwd);
  var deployer = clarinetAccounts.deployer;

  await ApiProvider.fromContracts(coreContracts, network, {
    secretKey: deployer.privateKey,
    stacksAddress: deployer.address,
  });

  await ApiProvider.fromContracts(arkadikoContracts, network, {
    secretKey: deployer.privateKey,
    stacksAddress: deployer.address,
  });

  const deployed = await ApiProvider.fromContracts(taralContracts, network, {
    secretKey: deployer.privateKey,
    stacksAddress: deployer.address,
  });

  Logger.debug("Deployed contracts to testnet");
  talToken = deployed.taralCoin.contract;
});
