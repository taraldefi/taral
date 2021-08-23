// import { contracts as arkadikoContracts } from "../../generated/external/arkadiko";
// import { contracts as coreContracts } from "../../generated/external/core";
import { NETWORK } from '../../configuration';
import {
  contracts as taralContracts,
  TaralCoinContract,
} from "../../generated/taral";
import { ClarinetAccounts, getClarinetAccounts } from "../../lib/configuration";
import { Logger } from "../../lib/logger";
import { ApiProvider } from "../../lib/providers";

export let talToken: TaralCoinContract;
export let clarinetAccounts: ClarinetAccounts;

beforeAll(async () => {
  jest.setTimeout(3000000);

  const cwd = `${process.cwd()}/clarity/`;
  clarinetAccounts = await getClarinetAccounts(cwd);
  var deployer = clarinetAccounts.deployer;

  // Comment out for now the core and arkadiko contracts untill we'll need them
  //
  // await ApiProvider.fromContracts(true, coreContracts, network, {
  //   secretKey: deployer.privateKey,
  //   stacksAddress: deployer.address,
  // });

  // await ApiProvider.fromContracts(true, arkadikoContracts, network, {
  //   secretKey: deployer.privateKey,
  //   stacksAddress: deployer.address,
  // });

  const deployed = await ApiProvider.fromContracts(
    false,
    taralContracts,
    NETWORK,
    {
      secretKey: deployer.privateKey,
      stacksAddress: deployer.address,
    }
  );

  Logger.debug("Deployed contracts to priv. testnet");
  talToken = deployed.taralCoin.contract;
});
