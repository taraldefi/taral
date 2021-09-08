import {
  BlocksApi,
  Configuration,
  FaucetsApi,
  RunFaucetResponse,
} from "@stacks/blockchain-api-client";
import * as btc from "bitcoinjs-lib";
import { PaymentResponse } from "../../lib/bitcoin/models";
import {
  decodeRawTransaction,
  decodeScript,
  getRawTransaction,
} from "../../lib/bitcoin/transaction";
import crossfetch from "cross-fetch";
import { NETWORK } from "../../configuration";
import { getBtcBalance } from "../../lib/bitcoin/balance";
import { makePayment } from "../../lib/bitcoin/payment";
import { ALICE_BTC, BOB_BTC, BOB_MNEMONIC } from "./utils";
import { retry } from "./utils/retry";
import { getRpcClient } from "../../lib/bitcoin/client";
import { getBlockByHash, getBlockHeader } from "../../lib/bitcoin/block";
import { Transaction } from "bitcore-lib";

let paymentResponse: PaymentResponse;

test("Transfer btc", async () => {
  const apiConfig = new Configuration({
    fetchApi: crossfetch,
    basePath: NETWORK.coreApiUrl,
  });

  const faucets = new FaucetsApi(apiConfig);

  var faucetTransaction: RunFaucetResponse = await faucets.runFaucetBtc({
    address: BOB_BTC,
  });

  expect(faucetTransaction.success).toBe(true);

  await new Promise((r) => setTimeout(r, 3000));

  const regtest = btc.networks.regtest;
  var balance = await getBtcBalance(regtest, BOB_BTC);

  expect(balance).toBeTruthy();
  console.log(`Account balance is: ${balance}`);

  paymentResponse = await makePayment(regtest, ALICE_BTC, BOB_MNEMONIC, 0.1);

  console.log("Bitcoin payment details: ");
  console.log(JSON.stringify(paymentResponse));

  await new Promise((r) => setTimeout(r, 3000));

  var balance = await getBtcBalance(regtest, ALICE_BTC);
  console.log(`Alice account balance is ${balance}`);
  expect(balance).toBeTruthy();


  var client = getRpcClient();
   
  var transactionDetails = await getRawTransaction(client, paymentResponse.txId);
  console.log("transaction details: ");
  console.log(JSON.stringify(transactionDetails));

  var blockDetails = await getBlockByHash(
    client, transactionDetails.blockhash
  );

  console.log("block details: ");
  console.log(JSON.stringify(blockDetails));

  var header = await getBlockHeader(client, transactionDetails.blockhash);
  console.log('block header');
  console.log(JSON.stringify(header));
});

// retry("Ensure bob has btc", 10, async () => {
//   const regtest = btc.networks.regtest;
//   var balance = await getBtcBalance(regtest, BOB_BTC);

//   expect(balance).toBeTruthy();
//   console.log(`Account balance is: ${balance}`);
// });

// test("Make payment to alice", async () => {
//   const regtest = btc.networks.regtest;
//   paymentResponse = await makePayment(regtest, ALICE_BTC, BOB_MNEMONIC, 0.1);

//   console.log("Bitcoin payment details: ");
//   console.log(JSON.stringify(paymentResponse));

//   await new Promise((r) => setTimeout(r, 3000));

//   var balance = await getBtcBalance(regtest, ALICE_BTC);
//   console.log(`Alice account balance is ${balance}`);
//   expect(balance).toBeTruthy();
// });

// retry("Check alice has btc", 10, async () => {
//   const regtest = btc.networks.regtest;
//   var balance = await getBtcBalance(regtest, ALICE_BTC);
//   console.log(`Alice account balance is ${balance}`);
//   expect(balance).toBeTruthy();
// });

// test("test", async () => {
//   var client = getRpcClient();
   
//   var transactionDetails = await getRawTransaction(client, 'b5f4f1574c6cae9ca0d12f9abdee6f65fc2703073645db15ab9bbd2a8e584fad');
//   console.log("transaction details: ");
//   console.log(JSON.stringify(transactionDetails));

//   var blockDetails = await getBlockByHash(
//     client, transactionDetails.blockhash
//   );

//   console.log("block details: ");
//   console.log(JSON.stringify(blockDetails));

//   var header = await getBlockHeader(client, transactionDetails.blockhash);
//   console.log('block header');
//   console.log(JSON.stringify(header));
// });
