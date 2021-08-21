import { StacksNetwork } from "@stacks/network";
import { StacksNetworkConfiguration } from "../../configuration/stacks-network";
import { contracts as arkadikoContracts } from "../../generated/external/arkadiko";
import { contracts as coreContracts } from "../../generated/external/core";
import {
  contracts as taralContracts,
  TaralCoinContract,
} from "../../generated/taral";
import { ClarinetAccounts, getClarinetAccounts } from "../../lib/configuration";
import { Logger } from "../../lib/logger";
import { ApiProvider } from "../../lib/providers";

export const network: StacksNetwork = new StacksNetworkConfiguration();
export let talToken: TaralCoinContract;
export let clarinetAccounts: ClarinetAccounts;

beforeAll(async () => {
  jest.setTimeout(3000000);

  const cwd = `${process.cwd()}/clarity/`;
  clarinetAccounts = await getClarinetAccounts(cwd);
  var deployer = clarinetAccounts.deployer;

  await ApiProvider.fromContracts(true, coreContracts, network, {
    secretKey: deployer.privateKey,
    stacksAddress: deployer.address,
  });

  await ApiProvider.fromContracts(true, arkadikoContracts, network, {
    secretKey: deployer.privateKey,
    stacksAddress: deployer.address,
  });

  const deployed = await ApiProvider.fromContracts(true, taralContracts, network, {
    secretKey: deployer.privateKey,
    stacksAddress: deployer.address,
  });

  Logger.debug("Deployed contracts to testnet");
  talToken = deployed.taralCoin.contract;
});
