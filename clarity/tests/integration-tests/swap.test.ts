import {
  Configuration,
  FaucetsApi,
  RunFaucetResponse,
} from "@stacks/blockchain-api-client";
import * as btc from "bitcoinjs-lib";
import { PaymentResponse } from "../../lib/bitcoin/models";
import crossfetch from "cross-fetch";
import { NETWORK } from "../../configuration";
import { getBtcBalance } from "../../lib/bitcoin/balance";
import { makePayment } from "../../lib/bitcoin/payment";
import { ALICE_BTC, BOB_BTC, BOB_MNEMONIC, BOB_STX } from "./utils";
import { paramsFromTx } from "../../lib/swap/params-from-tx";
import { btcFtSwapContract, clarinetAccounts, clarityBitcoinContract } from "./jest-setup";
import { getReversedTxId } from "../../lib/swap/get-txid";
import { verifyMerkleProof, verifyMerkleProof2 } from "../../lib/swap/verify-merkle-proof";
import { parseBlockHeader, verifyBlockHeader, verifyBlockHeader2 } from "../../lib/swap/block-header";
import { wasTxMined, wasTxMinedFromHex } from "../../lib/swap/was-tx-mined";
import { ClarityBitcoinRequest } from "../../lib/swap/base-request";
import { createBtcFtSwap } from "../../lib/swap/create-swap";
import { submitSwap } from "../../lib/swap/submit-swap";

let paymentResponse: PaymentResponse;

test("perform swap", async () => {
  const apiConfig = new Configuration({
    fetchApi: crossfetch,
    basePath: NETWORK.coreApiUrl,
  });

  const faucets = new FaucetsApi(apiConfig);
  const btcSwapAmount = 0.1;
  // const ftSwapAmount = 1000;

  var faucetTransaction: RunFaucetResponse = await faucets.runFaucetBtc({
    address: BOB_BTC
  });

  expect(faucetTransaction.success).toBe(true);

  await new Promise((r) => setTimeout(r, 3000));

  const regtest = btc.networks.regtest;
  var balance = await getBtcBalance(regtest, BOB_BTC);

  expect(balance).toBeTruthy();
  console.log(`Account balance is: ${balance}`);

  paymentResponse = await makePayment(regtest, ALICE_BTC, BOB_MNEMONIC, btcSwapAmount);

  console.log("Bitcoin payment details: ");
  console.log(JSON.stringify(paymentResponse));

  await new Promise((r) => setTimeout(r, 3000));

  var balance = await getBtcBalance(regtest, ALICE_BTC);
  console.log(`Alice account balance is ${balance}`);
  expect(balance).toBeTruthy();

  // var client = getRpcClient();
   
  // var transactionDetails = await getRawTransaction(client, paymentResponse.txId);
  // console.log("transaction details: ");
  // console.log(JSON.stringify(transactionDetails));

  // var blockDetails = await getBlockByHash(
  //   client, transactionDetails.blockhash
  // );

  // console.log("block details: ");
  // console.log(JSON.stringify(blockDetails));

  // var header = await getBlockHeader(client, transactionDetails.blockhash);
  // console.log('block header');
  // console.log(JSON.stringify(header));
});

// test("do swap", async () => {
//   const btcSwapAmount = 0.1;
//   const ftSwapAmount = 1000;
//   const ftContract = `${clarinetAccounts.deployer.address}.taral-token`;
//   const ftName = 'TARAL';

//   const baseRequest: ClarityBitcoinRequest = {
//     accounts: clarinetAccounts,
//     contract: clarityBitcoinContract
//   }

//   const paramsFromTransaction = await paramsFromTx({
//     ...baseRequest,
//     btcTxId: paymentResponse.txId,
//   });

//   const results = await Promise.all([
//     getReversedTxId({
//       ...baseRequest,
//       txCv: paramsFromTransaction.txCV
//     }),

//     verifyMerkleProof({
//       ...baseRequest,
//       merkleRoot: paramsFromTransaction.block!.merkleroot,
//       proofCV: paramsFromTransaction.proofCv,
//       txId: paymentResponse.rawTx
//     }),
//     verifyMerkleProof2({
//       ...baseRequest,
//       headerPartsCV: paramsFromTransaction.headerPartsCv,
//       proofCV: paramsFromTransaction.proofCv,
//       txCV: paramsFromTransaction.txCV
//     }),
//     verifyBlockHeader({
//       ...baseRequest,
//       headerParts: paramsFromTransaction.headerParts,
//       stacksBlockHeight: paramsFromTransaction.stxHeight
//     }),
//     verifyBlockHeader2({
//       ...baseRequest,
//       blockCV: paramsFromTransaction.blockCv
//     }),
//     wasTxMinedFromHex({
//       ...baseRequest,
//       blockCV: paramsFromTransaction.blockCv,
//       proofCV: paramsFromTransaction.proofCv,
//       txCV: paramsFromTransaction.txCV
//     }),
//     parseBlockHeader({
//       ...baseRequest,
//       header: paramsFromTransaction.blockHeader
//     }),
//     wasTxMined({
//       ...baseRequest,
//       blockPartsCV: paramsFromTransaction.headerPartsCv,
//       proofCV: paramsFromTransaction.proofCv,
//       txCV: paramsFromTransaction.txCV
//     }),
//   ]);

//   for(var i = 0; i < results.length; i++) {
//     console.log(JSON.stringify(results[i]));
//   }

//   const swapId = await createBtcFtSwap({
//     accounts: clarinetAccounts,
//     contract: btcFtSwapContract,
//     btcAmount: btcSwapAmount,
//     ftAmount: ftSwapAmount,
//     ftContract: ftContract,
//     btcAddress: ALICE_BTC,
//     stxAddress: BOB_STX
//   });

//   const swap = await submitSwap({
//     accounts: clarinetAccounts,
//     contract: btcFtSwapContract,
//     ftContract: ftContract,
//     headerPartsCv: paramsFromTransaction.headerPartsCv,
//     proofCv: paramsFromTransaction.proofCv,
//     swapId: swapId,
//     txPartsCv: paramsFromTransaction.txPartsCv
//   });
// });

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
