import {
  Configuration,
  FaucetsApi,
  RunFaucetResponse,
} from "@stacks/blockchain-api-client";
import crossfetch from "cross-fetch";
import { NETWORK } from "../../configuration";
import * as btc from 'bitcoinjs-lib';
import { retry } from './utils/retry';
import { BOB_BTC } from "./utils";
import { getBtcBalance } from "./utils/btc";

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

retry("Ensure wallet has btc", 3, async () => {
  const regtest = btc.networks.regtest;
  var balance = await getBtcBalance(regtest, BOB_BTC);

  expect(balance).toBeTruthy();
  console.log(`Account balance is: ${balance}`);
});

