import { ApiProvider } from "../shared/providers/api-provider";
import { contracts, CounterContract } from "../src";
import { ADDR1, testnetKeyMap } from "../configuration/testnet";
import { StacksNetwork } from "@stacks/network";
import { StacksNetworkConfiguration } from "../configuration/stacks-network";
import { Logger } from "../shared/logger";
import { txOk } from "../shared/transaction";

const TOKEN_OWNER = testnetKeyMap[ADDR1];
const alice = ADDR1;
// const bob   =  ADDR2;
let counter: CounterContract;
// let token: CounterCoinContract;

const network: StacksNetwork = new StacksNetworkConfiguration();

beforeAll(async () => {
  const deployed = await ApiProvider.fromContracts(contracts, network, {
    secretKey: TOKEN_OWNER.secretKey,
    stacksAddress: TOKEN_OWNER.address,
  });

  Logger.debug("Deployed contracts to testnet");
  Logger.debug(JSON.stringify(deployed));

  counter = deployed.counter.contract;
  // token = deployed.counterCoin.contract;
});

test("can increment", async () => {
  jest.setTimeout(3000000);

  const current = await counter.getCounter({
    sender: alice,
    discriminator: "metadata",
  });

  var something = await txOk(
    counter.increment({
      sender:
        "b8d99fd45da58038d630d9855d3ca2466e8e0f89d3894c4724f0efc9ff4b51f001",
      discriminator: "metadata",
    }),
    alice
  );

  expect(something.value).toEqual(current + 1);

  expect(
    await counter.getCounter({
      sender: alice,
      discriminator: "metadata",
    })
  ).toEqual(current + 1);
});
