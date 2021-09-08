// import {
//   BlocksApi,
//   Configuration,
//   FaucetsApi,
//   RunFaucetResponse,
// } from "@stacks/blockchain-api-client";
// import * as btc from "bitcoinjs-lib";
// import { PaymentResponse } from "../../lib/bitcoin/models";
// import {
//   decodeRawTransaction,
//   decodeScript,
//   getRawTransaction,
// } from "../../lib/bitcoin/transaction";
// import crossfetch from "cross-fetch";
// import { NETWORK } from "../../configuration";
// import { getBtcBalance } from "../../lib/bitcoin/balance";
// import { makePayment } from "../../lib/bitcoin/payment";
// import { ALICE_BTC, BOB_BTC, BOB_MNEMONIC } from "./utils";
// import { retry } from "./utils/retry";
// import { getRpcClient } from "../../lib/bitcoin/client";
// import { getBlockByHash, getBlockHeader } from "../../lib/bitcoin/block";
// import { Transaction } from "bitcore-lib";

// let paymentResponse: PaymentResponse;

// // test("Request btc from faucet", async () => {
// //   const apiConfig = new Configuration({
// //     fetchApi: crossfetch,
// //     basePath: NETWORK.coreApiUrl,
// //   });

// //   const faucets = new FaucetsApi(apiConfig);

// //   var faucetTransaction: RunFaucetResponse = await faucets.runFaucetBtc({
// //     address: BOB_BTC,
// //   });

// //   expect(faucetTransaction.success).toBe(true);
// // });

// // retry("Ensure bob has btc", 10, async () => {
// //   const regtest = btc.networks.regtest;
// //   var balance = await getBtcBalance(regtest, BOB_BTC);

// //   expect(balance).toBeTruthy();
// //   console.log(`Account balance is: ${balance}`);
// // });

// // test("Make payment to alice", async () => {
// //   const regtest = btc.networks.regtest;
// //   paymentResponse = await makePayment(regtest, ALICE_BTC, BOB_MNEMONIC, 0.1);

// //   console.log("Bitcoin payment details: ");
// //   console.log(JSON.stringify(paymentResponse));
// // });

// // retry("Check alice has btc", 10, async () => {
// //   const regtest = btc.networks.regtest;
// //   var balance = await getBtcBalance(regtest, ALICE_BTC);
// //   console.log(`Alice account balance is ${balance}`);
// //   expect(balance).toBeTruthy();
// // });


// test("test", async () => {
//   var client = getRpcClient();
//   //   {
//   //     "txid":"b5f4f1574c6cae9ca0d12f9abdee6f65fc2703073645db15ab9bbd2a8e584fad",
//   //     "hash":"b5f4f1574c6cae9ca0d12f9abdee6f65fc2703073645db15ab9bbd2a8e584fad",
//   //     "version":2,
//   //     "size":225,
//   //     "vsize":225,
//   //     "weight":900,
//   //     "locktime":0,
//   //     "vin":[
//   //        {
//   //           "txid":"33eda777be4cc94a87ee3c918a76c3b4ba296a1e48fbb074f320a230bc66dad1",
//   //           "vout":0,
//   //           "scriptSig":{
//   //              "asm":"304402204798cef338b64237c2c89e8a221b3541334349852a95d14b5b2404a07aa384b30220394c8f2e571239d165267f793f7f6662cfa2980acebb44b87d30f47e665131d0[ALL] 03cd2cfdbd2ad9332828a7a13ef62cb999e063421c708e863a7ffed71fb61c88c9",
//   //              "hex":"47304402204798cef338b64237c2c89e8a221b3541334349852a95d14b5b2404a07aa384b30220394c8f2e571239d165267f793f7f6662cfa2980acebb44b87d30f47e665131d0012103cd2cfdbd2ad9332828a7a13ef62cb999e063421c708e863a7ffed71fb61c88c9"
//   //           },
//   //           "sequence":4294967295
//   //        }
//   //     ],
//   //     "vout":[
//   //        {
//   //           "value":0.1,
//   //           "n":0,
//   //           "scriptPubKey":{
//   //              "asm":"OP_DUP OP_HASH160 6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce OP_EQUALVERIFY OP_CHECKSIG",
//   //              "hex":"76a9146d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce88ac",
//   //              "reqSigs":1,
//   //              "type":"pubkeyhash",
//   //              "addresses":[
//   //                 "mqVnk6NPRdhntvfm4hh9vvjiRkFDUuSYsH"
//   //              ]
//   //           }
//   //        },
//   //        {
//   //           "value":0.399928,
//   //           "n":1,
//   //           "scriptPubKey":{
//   //              "asm":"OP_DUP OP_HASH160 7321b74e2b6a7e949e6c4ad313035b1665095017 OP_EQUALVERIFY OP_CHECKSIG",
//   //              "hex":"76a9147321b74e2b6a7e949e6c4ad313035b166509501788ac",
//   //              "reqSigs":1,
//   //              "type":"pubkeyhash",
//   //              "addresses":[
//   //                 "mr1iPkD9N3RJZZxXRk7xF9d36gffa6exNC"
//   //              ]
//   //           }
//   //        }
//   //     ],
//   //     "hex":"0200000001d1da66bc30a220f374b0fb481e6a29bab4c3768a913cee874ac94cbe77a7ed33000000006a47304402204798cef338b64237c2c89e8a221b3541334349852a95d14b5b2404a07aa384b30220394c8f2e571239d165267f793f7f6662cfa2980acebb44b87d30f47e665131d0012103cd2cfdbd2ad9332828a7a13ef62cb999e063421c708e863a7ffed71fb61c88c9ffffffff0280969800000000001976a9146d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce88ace03d6202000000001976a9147321b74e2b6a7e949e6c4ad313035b166509501788ac00000000",
//   //     "blockhash":"6147250004fa1717e279eaad8f0a87a14381171d0f0a7724ede947947753c2ff",
//   //     "confirmations":53,
//   //     "time":1630676783,
//   //     "blocktime":1630676783
//   //  }

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

//   let transaction = new Transaction(transactionDetails.hex);

//   for(let i = 0; i < transaction.inputs.length; i++) {
//     var input = transaction.inputs[i];

//     console.log('Input ' + input.sequenceNumber + ' with prevtxid ' + input.prevTxId.toString('hex'));

//     if (input.output) {
//       console.log('Input has output');

//       console.log(JSON.stringify(input.output.script));

//       input.output.
//     }
//   }

//   console.log(JSON.stringify(transaction));
// });
