import { StacksNetwork } from "@stacks/network";
import { StacksNetworkConfiguration } from "../../configuration/stacks-network";
import { ADDR1, testnetKeyMap } from "../../configuration/testnet";
import { Logger } from "../../shared/logger";
import { ApiProvider } from "../../shared/providers";
import { TestProvider } from "../../shared/providers/test-provider";
import { contracts } from "../../src";

import { TaralCoinContract } from "../../src";

const TOKEN_OWNER = testnetKeyMap[ADDR1];
let taralCoin: TaralCoinContract;
const network: StacksNetwork = new StacksNetworkConfiguration();

export let talToken: TaralCoinContract;

beforeAll(async () => {
  jest.setTimeout(3000000);
  const deployed = await ApiProvider.fromContracts(contracts, network, {
    secretKey: TOKEN_OWNER.secretKey,
    stacksAddress: TOKEN_OWNER.address,
  });

  Logger.debug("Deployed contracts to testnet");
  talToken = deployed.taralCoin.contract;
});
