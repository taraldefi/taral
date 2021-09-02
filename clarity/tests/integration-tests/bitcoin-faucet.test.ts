import {
  Configuration,
  FaucetsApi,
  RunFaucetResponse,
} from "@stacks/blockchain-api-client";
import crossfetch from "cross-fetch";
import { NETWORK } from "../../configuration";
import * as btc from 'bitcoinjs-lib';
import { retry } from './utils/retry';
import { ALICE_BTC, BOB_BTC } from "./utils";
import { getBtcBalance, makePayment } from "./utils/btc";

test("Request btc from faucet", async () => {
  const apiConfig = new Configuration({
    fetchApi: crossfetch,
    basePath: NETWORK.coreApiUrl,
  });

  const faucets = new FaucetsApi(apiConfig);

  var faucetTransaction: RunFaucetResponse = await faucets.runFaucetBtc({
    address: BOB_BTC,
  });

  expect(faucetTransaction.success).toBe(true);
});

retry("Ensure bob has btc", 3, async () => {
  const regtest = btc.networks.regtest;
  var balance = await getBtcBalance(regtest, BOB_BTC);

  expect(balance).toBeTruthy();
  console.log(`Account balance is: ${balance}`);
});

retry("Make payment to alice", 3, async() => {
  const regtest = btc.networks.regtest;
  var paymentDetails = await makePayment(regtest, ALICE_BTC, 0.1);

  console.log('Bitcoin payment details: ');
  console.log(JSON.stringify(paymentDetails));
  
});

retry("Check alice has btc", 10, async () => {
  const regtest = btc.networks.regtest;
  var balance = await getBtcBalance(regtest, ALICE_BTC);
  console.log(`Alice account balance is ${balance}`);
  expect(balance).toBeTruthy();
})