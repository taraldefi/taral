import {
  Configuration,
  FaucetsApi,
  RunFaucetResponse,
} from "@stacks/blockchain-api-client";
import crossfetch from "cross-fetch";
import { NETWORK } from "../../configuration";
import * as btc from 'bitcoinjs-lib';
import { retry } from './utils/retry';
import { BTC_ADDRESS } from "./utils";
import { getBtcBalance } from "./utils/btc";

test("Request btc from faucet", async () => {
  const apiConfig = new Configuration({
    fetchApi: crossfetch,
    basePath: NETWORK.coreApiUrl,
  });

  const faucets = new FaucetsApi(apiConfig);

  var faucetTransaction: RunFaucetResponse = await faucets.runFaucetBtc({
    address: BTC_ADDRESS,
  });

  expect(faucetTransaction.success).toBe(true);
});

retry("Ensure wallet has btc", 3, async () => {
  const regtest = btc.networks.regtest;
  var balance = await getBtcBalance(regtest, BTC_ADDRESS);

  expect(balance).toBeTruthy();
  console.log(`Account balance is: ${balance}`);
});