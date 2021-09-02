import {
  Configuration,
  FaucetsApi,
  RunFaucetResponse,
} from "@stacks/blockchain-api-client";
import * as btc from "bitcoinjs-lib";
import { PaymentResponse } from "clarity/lib/bitcoin/models";
import crossfetch from "cross-fetch";
import { NETWORK } from "../../configuration";
import { getBtcBalance } from "../../lib/bitcoin/balance";
import { makePayment } from "../../lib/bitcoin/payment";
import { ALICE_BTC, BOB_BTC, BOB_MNEMONIC } from "./utils";
import { retry } from "./utils/retry";

let paymentResponse: PaymentResponse;

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

retry("Ensure bob has btc", 10, async () => {
  const regtest = btc.networks.regtest;
  var balance = await getBtcBalance(regtest, BOB_BTC);

  expect(balance).toBeTruthy();
  console.log(`Account balance is: ${balance}`);
});

test("Make payment to alice", async () => {
  const regtest = btc.networks.regtest;
  paymentResponse = await makePayment(regtest, ALICE_BTC, BOB_MNEMONIC, 0.1);

  console.log("Bitcoin payment details: ");
  console.log(JSON.stringify(paymentResponse));
});

retry("Check alice has btc", 10, async () => {
  const regtest = btc.networks.regtest;
  var balance = await getBtcBalance(regtest, ALICE_BTC);
  console.log(`Alice account balance is ${balance}`);
  expect(balance).toBeTruthy();
});
