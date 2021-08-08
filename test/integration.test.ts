import { StacksNetwork } from "@stacks/network";
import { StacksNetworkConfiguration } from "../configuration/stacks-network";
import { ADDR1, testnetKeyMap } from "../configuration/testnet";
import { Logger } from "../shared/logger";
import { ApiProvider } from "../shared/providers/api-provider";
import { txOk } from "../shared/transaction";
import { contracts, CounterContract } from "../src";

const TOKEN_OWNER = testnetKeyMap[ADDR1];
const alice = ADDR1;
// const bob   =  ADDR2;
let counter: CounterContract;
// let token: CounterCoinContract;

const network: StacksNetwork = new StacksNetworkConfiguration();

beforeAll(async () => {
  jest.setTimeout(3000000);
  const deployed = await ApiProvider.fromContracts(contracts, network, {
    secretKey: TOKEN_OWNER.secretKey,
    stacksAddress: TOKEN_OWNER.address,
  });

  Logger.debug("Deployed contracts to testnet");
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
        "2b14b8c3d746d2d5fd8fdfdc55200dacb46f276dceff2f90f8342eed35e92a1501",
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
