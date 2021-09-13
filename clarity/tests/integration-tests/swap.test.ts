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
import { getAccountFromMnemonic, makePayment } from "../../lib/bitcoin/payment";
import {
  btcFtSwapContract,
  clarinetAccounts,
  clarityBitcoinContract,
} from "./jest-setup";
import {
  ALICE_BTC,
  BOB_BTC,
  BOB_MNEMONIC,
  BOB_STX,
  getWallet,
  getWalletAtIndex,
} from "./utils";
import { decodeRawTransaction } from "../../lib/bitcoin/transaction";
import { getRpcClient } from "../../lib/bitcoin/client";
import { getNonce } from "../../lib/stacks/get-nonce";
import { address } from "bitcoinjs-lib";

// test("create swap", async () => {
//   const btcSwapAmount = 0.1;
//   const ftSwapAmount = 10;
//   const ftContract = `${clarinetAccounts.deployer.address}.taral-coin`;

//   const sellerWallet = getWalletAtIndex(2);
//   const buyerWallet = getWalletAtIndex(6);

//   const sellerDerivedBtcInfo = await getAccountFromMnemonic(
//     btc.networks.regtest,
//     sellerWallet.mnemonic
//   );
//   console.log(`Seller address ${sellerDerivedBtcInfo.address}`);

//   //   const ftName = "TARAL";

//   const swapId = await createBtcFtSwap({
//     accounts: clarinetAccounts,
//     contract: btcFtSwapContract,
//     btcAmount: btcSwapAmount,
//     ftAmount: ftSwapAmount,
//     ftContract: ftContract,
//     ftBuyerStacksAddress: buyerWallet.address,
//     ftSellerBitcoinAddress: sellerDerivedBtcInfo.address,
//     network: btc.networks.regtest,
//     caller: sellerWallet
//   });

//   console.log(`SWAP ID :::: ${swapId}`);
// });

// test("make btc transaction", async () => {
//   const apiConfig = new Configuration({
//     fetchApi: crossfetch,
//     basePath: NETWORK.coreApiUrl,
//   });

//   const sellerWallet = getWalletAtIndex(2);
//   const buyerWallet = getWalletAtIndex(6);

//   const sellerDerivedBtcInfo = await getAccountFromMnemonic(
//     btc.networks.regtest,
//     sellerWallet.mnemonic
//   );
//   console.log(`Seller address ${sellerDerivedBtcInfo.address}`);

//   const buyerDerivedBtcInfo = await getAccountFromMnemonic(
//     btc.networks.regtest,
//     buyerWallet.mnemonic
//   );
//   console.log(`Buyer address ${buyerDerivedBtcInfo.address}`);

//   const faucets = new FaucetsApi(apiConfig);
//   const btcSwapAmount = 0.1;

//   var faucetTransaction: RunFaucetResponse = await faucets.runFaucetBtc({
//     address: buyerDerivedBtcInfo.address,
//   });

//   expect(faucetTransaction.success).toBe(true);

//   await new Promise((r) => setTimeout(r, 3000));

//   const regtest = btc.networks.regtest;
//   var balance = await getBtcBalance(regtest, buyerDerivedBtcInfo.address);

//   expect(balance).toBeTruthy();
//   console.log(`Account balance is: ${balance}`);

//   await new Promise((r) => setTimeout(r, 3000));

//   const paymentResponse = await makePayment(
//     regtest,
//     sellerDerivedBtcInfo.address,
//     buyerWallet.mnemonic,
//     btcSwapAmount
//   );

//   console.log("Bitcoin payment details: ");
//   console.log(JSON.stringify(paymentResponse));

//   await new Promise((r) => setTimeout(r, 3000));

//   var balance = await getBtcBalance(regtest, sellerDerivedBtcInfo.address);
//   console.log(`Seller account balance is ${balance}`);
//   expect(balance).toBeTruthy();
// });

// test("do swap", async () => {
//   jest.setTimeout(3000000);

//   const btcSwapAmount = 0.1;
//   const ftSwapAmount = 1000;
//   const ftContract = `${clarinetAccounts.deployer.address}.taral-coin`;
//   const ftName = "TARAL";

//   const rawTx =
//     "0200000001d1da66bc30a220f374b0fb481e6a29bab4c3768a913cee874ac94cbe77a7ed33000000006a47304402204798cef338b64237c2c89e8a221b3541334349852a95d14b5b2404a07aa384b30220394c8f2e571239d165267f793f7f6662cfa2980acebb44b87d30f47e665131d0012103cd2cfdbd2ad9332828a7a13ef62cb999e063421c708e863a7ffed71fb61c88c9ffffffff0280969800000000001976a9146d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce88ace03d6202000000001976a9147321b74e2b6a7e949e6c4ad313035b166509501788ac00000000";
//   const txId =
//     "b5f4f1574c6cae9ca0d12f9abdee6f65fc2703073645db15ab9bbd2a8e584fad";

//   const baseRequest: ClarityBitcoinRequest = {
//     accounts: clarinetAccounts,
//     contract: clarityBitcoinContract,
//   };

//   const paramsFromTransaction = await paramsFromTx({
//     ...baseRequest,
//     btcTxId: txId,
//   });

//   const getReversedTxIdResponse = await getReversedTxId({
//     ...baseRequest,
//     txCv: paramsFromTransaction.txCV,
//   });

//   const merkleProof1 = await verifyMerkleProof({
//     ...baseRequest,
//     merkleRoot: paramsFromTransaction.block!.merkleroot,
//     proofCV: paramsFromTransaction.proofCv,
//     txId: txId,
//   });

//   const merkleProof2 = await verifyMerkleProof2({
//     ...baseRequest,
//     headerPartsCV: paramsFromTransaction.headerPartsCv,
//     proofCV: paramsFromTransaction.proofCv,
//     txCV: paramsFromTransaction.txCV,
//   });

//   const blockHeader = await verifyBlockHeader({
//     ...baseRequest,
//     headerParts: paramsFromTransaction.headerParts,
//     stacksBlockHeight: paramsFromTransaction.stxHeight,
//   });

//   const blockHeader2 = await verifyBlockHeader2({
//     ...baseRequest,
//     blockCV: paramsFromTransaction.blockCv,
//   });

//   const wasTxMinedFromHexResponse = await wasTxMinedFromHex({
//     ...baseRequest,
//     blockCV: paramsFromTransaction.blockCv,
//     proofCV: paramsFromTransaction.proofCv,
//     txCV: paramsFromTransaction.txCV,
//   });

//   const parseBlockHeaderResponse = await parseBlockHeader({
//     ...baseRequest,
//     header: paramsFromTransaction.blockHeader,
//   });

//   const wasTxMinedResult = await wasTxMined({
//         ...baseRequest,
//         blockPartsCV: paramsFromTransaction.headerPartsCv,
//         proofCV: paramsFromTransaction.proofCv,
//         txCV: paramsFromTransaction.txCV
//       });

//   console.log('got was tx mined result');
//   console.log(JSON.stringify(wasTxMinedResult));

//   console.log("Params from transaction ::: ");
//   console.log(JSON.stringify(paramsFromTransaction));

//   console.log("get reversed tx id response ");
//   console.log(JSON.stringify(getReversedTxIdResponse));

//   console.log("Got merkleproof1 ");
//   console.log(JSON.stringify(merkleProof1));

//   console.log("Got merkleproof2");
//   console.log(JSON.stringify(merkleProof2));

//   console.log("Got verifyBlockHeader result");
//   console.log(JSON.stringify(blockHeader));

//   console.log("Got verifyBlockHeader2 result");
//   console.log(JSON.stringify(blockHeader2));

//   console.log("Got tx mined from hex result ");
//   console.log(JSON.stringify(wasTxMinedFromHexResponse));

//   console.log('Got parse block header responsse');
//   console.log(JSON.stringify(parseBlockHeaderResponse));

//   // const swap = await submitSwap({
//   //   accounts: clarinetAccounts,
//   //   contract: btcFtSwapContract,
//   //   ftContract: ftContract,
//   //   headerPartsCv: paramsFromTransaction.headerPartsCv,
//   //   proofCv: paramsFromTransaction.proofCv,
//   //   swapId: swapId,
//   //   txPartsCv: paramsFromTransaction.txPartsCv
//   // });
// });

test("submit swap ", async () => {
  const btcSwapAmount = 0.1;
  const ftSwapAmount = 10;
  const ftContract = `${clarinetAccounts.deployer.address}.taral-coin`;

  const sellerWallet = getWalletAtIndex(2);
  const buyerWallet = getWalletAtIndex(6);

  const rawTx =
    "0200000001dff797a6360dc2806dda4e63f457944890910761c431fffec6d86057f9f67d5b000000006a4730440220174b16026e132e3fe428ff96d1fecf99cc1af513a71f3f5b98fc286855527135022030138b018dc49bd427c1637d0ec35033883bbbca89a3248cf4d2cd397a7072c90121028efa20fa5706567008ebaf48f7ae891342eeb944d96392f719c505c89f84ed8dffffffff0280969800000000001976a91499e2ec69ac5b6e67b4e26edd0e2c1c1a6b9bbd2388ace03d6202000000001976a914d540a8a654c4c0f54f910212ff3b119cb2257bb888ac00000000";
  const txId =
    "8485222771089951faa0bb95e7fa4e83b6f5111c7683d67e6f43e839883189f8";

  const baseRequest: ClarityBitcoinRequest = {
    accounts: clarinetAccounts,
    contract: clarityBitcoinContract,
  };

  const paramsFromTransaction = await paramsFromTx({
    ...baseRequest,
    btcTxId: txId,
  });

  const sellerDerivedBtcInfo = await getAccountFromMnemonic(
    btc.networks.regtest,
    sellerWallet.mnemonic
  );
  console.log(`Seller address ${sellerDerivedBtcInfo.address}`);

  const swap = await submitSwap({
    accounts: clarinetAccounts,
    contract: btcFtSwapContract,
    ftContract: ftContract,
    headerPartsCv: paramsFromTransaction.headerPartsCv,
    proofCv: paramsFromTransaction.proofCv,
    swapId: 0,
    txPartsCv: paramsFromTransaction.txPartsCv,
    caller: buyerWallet,
  });

  console.log("Submitted swap");
  console.log(JSON.stringify(swap));
});

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

// //   await new Promise((r) => setTimeout(r, 3000));

// //   var balance = await getBtcBalance(regtest, ALICE_BTC);
// //   console.log(`Alice account balance is ${balance}`);
// //   expect(balance).toBeTruthy();
// // });

// // retry("Check alice has btc", 10, async () => {
// //   const regtest = btc.networks.regtest;
// //   var balance = await getBtcBalance(regtest, ALICE_BTC);
// //   console.log(`Alice account balance is ${balance}`);
// //   expect(balance).toBeTruthy();
// // });

// // test("test", async () => {
// //   var client = getRpcClient();

// //   var transactionDetails = await getRawTransaction(client, 'b5f4f1574c6cae9ca0d12f9abdee6f65fc2703073645db15ab9bbd2a8e584fad');
// //   console.log("transaction details: ");
// //   console.log(JSON.stringify(transactionDetails));

// //   var blockDetails = await getBlockByHash(
// //     client, transactionDetails.blockhash
// //   );

// //   console.log("block details: ");
// //   console.log(JSON.stringify(blockDetails));

// //   var header = await getBlockHeader(client, transactionDetails.blockhash);
// //   console.log('block header');
// //   console.log(JSON.stringify(header));
// // });
