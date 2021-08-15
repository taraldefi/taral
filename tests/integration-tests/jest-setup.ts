import { StacksNetwork } from "@stacks/network";
import { StacksNetworkConfiguration } from "../../configuration/stacks-network";
import { ClarinetAccounts, getClarinetAccounts } from "../../shared/configuration";
import { Logger } from "../../shared/logger";
import { ApiProvider } from "../../shared/providers";
import { contracts } from "../../src";
import { TaralCoinContract } from "../../src";

export const network: StacksNetwork = new StacksNetworkConfiguration();
export let talToken: TaralCoinContract;
export let clarinetAccounts: ClarinetAccounts;

beforeAll(async () => {
  jest.setTimeout(3000000);

  const cwd = process.cwd();
  clarinetAccounts = await getClarinetAccounts(cwd);

  var deployer = clarinetAccounts.deployer;

  const deployed = await ApiProvider.fromContracts(contracts, network, {
    secretKey: deployer.privateKey,
    stacksAddress: deployer.address,
  });

  Logger.debug("Deployed contracts to testnet");
  talToken = deployed.taralCoin.contract;
});
