import {
  Configuration,
  FaucetsApi,
  RunFaucetResponse,
} from "@stacks/blockchain-api-client";
import * as btc from "bitcoinjs-lib";
import { ClarityBitcoinRequest } from "../../lib/swap/base-request";
import {
  parseBlockHeader,
  verifyBlockHeader,
  verifyBlockHeader2,
} from "../../lib/swap/block-header";
import { createBtcFtSwap } from "../../lib/swap/create-swap";
import { getReversedTxId } from "../../lib/swap/get-txid";
import { paramsFromTx } from "../../lib/swap/params-from-tx";
import { submitSwap } from "../../lib/swap/submit-swap";
import {
  verifyMerkleProof,
  verifyMerkleProof2,
} from "../../lib/swap/verify-merkle-proof";
import { wasTxMined, wasTxMinedFromHex } from "../../lib/swap/was-tx-mined";
import crossfetch from "cross-fetch";
import { NETWORK } from "../../configuration";
import { getBtcBalance } from "../../lib/bitcoin/balance";
import { PaymentResponse } from "../../lib/bitcoin/models";
import { makePayment } from "../../lib/bitcoin/payment";
import {
  btcFtSwapContract,
  clarinetAccounts,
  clarityBitcoinContract,
} from "./jest-setup";
import { ALICE_BTC, BOB_BTC, BOB_MNEMONIC, BOB_STX } from "./utils";
import { decodeRawTransaction } from "../../lib/bitcoin/transaction";
import { getRpcClient } from "../../lib/bitcoin/client";

// let paymentResponse: PaymentResponse;

// test("perform swap", async () => {
//   const apiConfig = new Configuration({
//     fetchApi: crossfetch,
//     basePath: NETWORK.coreApiUrl,
//   });

//   const faucets = new FaucetsApi(apiConfig);
//   const btcSwapAmount = 0.1;
//   // const ftSwapAmount = 1000;

//   var faucetTransaction: RunFaucetResponse = await faucets.runFaucetBtc({
//     address: BOB_BTC,
//   });

//   expect(faucetTransaction.success).toBe(true);

//   await new Promise((r) => setTimeout(r, 3000));

//   const regtest = btc.networks.regtest;
//   var balance = await getBtcBalance(regtest, BOB_BTC);

//   expect(balance).toBeTruthy();
//   console.log(`Account balance is: ${balance}`);

//   await new Promise((r) => setTimeout(r, 3000));

//   paymentResponse = await makePayment(
//     regtest,
//     ALICE_BTC,
//     BOB_MNEMONIC,
//     btcSwapAmount
//   );

//   console.log("Bitcoin payment details: ");
//   console.log(JSON.stringify(paymentResponse));

//   await new Promise((r) => setTimeout(r, 3000));

//   var balance = await getBtcBalance(regtest, ALICE_BTC);
//   console.log(`Alice account balance is ${balance}`);
//   expect(balance).toBeTruthy();

//   // var client = getRpcClient();

//   // var transactionDetails = await getRawTransaction(client, paymentResponse.txId);
//   // console.log("transaction details: ");
//   // console.log(JSON.stringify(transactionDetails));

//   // var blockDetails = await getBlockByHash(
//   //   client, transactionDetails.blockhash
//   // );

//   // console.log("block details: ");
//   // console.log(JSON.stringify(blockDetails));

//   // var header = await getBlockHeader(client, transactionDetails.blockhash);
//   // console.log('block header');
//   // console.log(JSON.stringify(header));
// });

test("do swap", async () => {
  jest.setTimeout(3000000);

  const btcSwapAmount = 0.1;
  const ftSwapAmount = 1000;
  const ftContract = `${clarinetAccounts.deployer.address}.taral-token`;
  const ftName = "TARAL";

  const rawTx =
    "02000000019f56b53230cb71a365b7a9d4059fbcabc48b72a47f43b157c90c6029cfee1c1f000000006b4830450221008e7d101620dd5f4e0cce22c220db521157b608f19abf3e30daf5487c8e9c98300220469f927cc6ee0ea4afdecfb8a77882f9eae289f60f231636dea22ed733f30510012103cd2cfdbd2ad9332828a7a13ef62cb999e063421c708e863a7ffed71fb61c88c9ffffffff0280969800000000001976a9146d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce88ace03d6202000000001976a9147321b74e2b6a7e949e6c4ad313035b166509501788ac00000000";
  const txId =
    "c2274e765beb71f4c0846b53eb828c05267fbdce4526a328fcf166bc179bc119";

  const baseRequest: ClarityBitcoinRequest = {
    accounts: clarinetAccounts,
    contract: clarityBitcoinContract,
  };

  // const decoded = await decodeRawTransaction(getRpcClient(), rawTx);
  // console.log('decoded');
  // console.log(JSON.stringify(decoded));

  const paramsFromTransaction = await paramsFromTx({
    ...baseRequest,
    btcTxId: txId,
  });

  // const getReversedTxIdResponse = await getReversedTxId({
  //   ...baseRequest,
  //   txCv: paramsFromTransaction.txCV,
  // });

  // const merkleProof1 = await verifyMerkleProof({
  //   ...baseRequest,
  //   merkleRoot: paramsFromTransaction.block!.merkleroot,
  //   proofCV: paramsFromTransaction.proofCv,
  //   txId: txId,
  // });

  // const merkleProof2 = await verifyMerkleProof2({
  //   ...baseRequest,
  //   headerPartsCV: paramsFromTransaction.headerPartsCv,
  //   proofCV: paramsFromTransaction.proofCv,
  //   txCV: paramsFromTransaction.txCV,
  // });

 
  // const blockHeader = await verifyBlockHeader({
  //   ...baseRequest,
  //   headerParts: paramsFromTransaction.headerParts,
  //   stacksBlockHeight: paramsFromTransaction.stxHeight,
  // });

  // const blockHeader2 = await verifyBlockHeader2({
  //   ...baseRequest,
  //   blockCV: paramsFromTransaction.blockCv,
  // });

  // const wasTxMinedFromHexResponse = await wasTxMinedFromHex({
  //   ...baseRequest,
  //   blockCV: paramsFromTransaction.blockCv,
  //   proofCV: paramsFromTransaction.proofCv,
  //   txCV: paramsFromTransaction.txCV,
  // });

  // const parseBlockHeaderResponse = await parseBlockHeader({
  //   ...baseRequest,
  //   header: paramsFromTransaction.blockHeader,
  // });

  // const wasTxMinedResult = await wasTxMined({
  //       ...baseRequest,
  //       blockPartsCV: paramsFromTransaction.headerPartsCv,
  //       proofCV: paramsFromTransaction.proofCv,
  //       txCV: paramsFromTransaction.txCV
  //     });

  // console.log('got was tx mined result');
  // console.log(JSON.stringify(wasTxMinedResult));

  
  // console.log("Params from transaction ::: ");
  // console.log(JSON.stringify(paramsFromTransaction));

  
  // console.log("get reversed tx id response ");
  // console.log(JSON.stringify(getReversedTxIdResponse));
  
  // console.log("Got merkleproof1 ");
  // console.log(JSON.stringify(merkleProof1));

  // console.log("Got merkleproof2");
  // console.log(JSON.stringify(merkleProof2));


  // console.log("Got verifyBlockHeader result");
  // console.log(JSON.stringify(blockHeader));

  
  // console.log("Got verifyBlockHeader2 result");
  // console.log(JSON.stringify(blockHeader2));

  
  // console.log("Got tx mined from hex result ");
  // console.log(JSON.stringify(wasTxMinedFromHexResponse));

  
  // console.log('Got parse block header responsse');
  // console.log(JSON.stringify(parseBlockHeaderResponse));


  const swapId = await createBtcFtSwap({
    accounts: clarinetAccounts,
    contract: btcFtSwapContract,
    btcAmount: btcSwapAmount,
    ftAmount: ftSwapAmount,
    ftContract: ftContract,
    btcAddress: ALICE_BTC,
    stxAddress: BOB_STX,
    network: btc.networks.regtest
  });

  console.log(`SWAP ID :::: ${swapId}`);

  // const swap = await submitSwap({
  //   accounts: clarinetAccounts,
  //   contract: btcFtSwapContract,
  //   ftContract: ftContract,
  //   headerPartsCv: paramsFromTransaction.headerPartsCv,
  //   proofCv: paramsFromTransaction.proofCv,
  //   swapId: swapId,
  //   txPartsCv: paramsFromTransaction.txPartsCv
  // });
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
