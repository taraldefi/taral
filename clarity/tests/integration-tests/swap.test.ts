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
import { getAccountFromMnemonic, makePayment } from "../../lib/bitcoin/payment";
import {
  btcFtSwapContract,
  clarinetAccounts,
  clarityBitcoinContract,
} from "./jest-setup";
import {
  getWalletAtIndex,
} from "./utils";
import { Logger } from "../../lib";
import { retry } from "../utils/retry";
import { PaymentResponse } from '../../lib/bitcoin/models';

test("make btc transaction", async () => {
  const regtest = btc.networks.regtest;
  const ftContract = `${clarinetAccounts.deployer.address}.taral-coin`;
  const btcSwapAmount = 0.1;
  const ftSwapAmount = 3000;

  const apiConfig = new Configuration({
    fetchApi: crossfetch,
    basePath: NETWORK.coreApiUrl,
  });

  const sellerWallet = getWalletAtIndex(2);

  const buyerWallet = getWalletAtIndex(6);

  const sellerDerivedBtcInfo = await getAccountFromMnemonic(
    btc.networks.regtest,
    sellerWallet.mnemonic
  );

  Logger.debug(`Seller address ${sellerDerivedBtcInfo.address}`);

  const buyerDerivedBtcInfo = await getAccountFromMnemonic(
    btc.networks.regtest,
    buyerWallet.mnemonic
  );

  Logger.debug(`Buyer address ${buyerDerivedBtcInfo.address}`);

  const faucets = new FaucetsApi(apiConfig);

  var faucetTransaction: RunFaucetResponse = await faucets.runFaucetBtc({
    address: buyerDerivedBtcInfo.address,
  });

  expect(faucetTransaction.success).toBe(true);

  await new Promise((r) => setTimeout(r, 15000));

  const buyerBalance: number = await retry<number>(async function () {
    const btcBalance = await getBtcBalance(regtest, buyerDerivedBtcInfo.address);
    expect(btcBalance).toBeTruthy();
    Logger.debug(`Account balance is: ${btcBalance}`);
    return btcBalance;
  }, {
    delay: 1000,
    maxAttempts: 50,
    timeout: 80000
  });

  Logger.debug(`Buyer account balance (BTC) is: ${buyerBalance}`);

  expect(buyerBalance).toBeTruthy();

  Logger.debug('Calling create swap');
  const swapId = await createBtcFtSwap({
    accounts: clarinetAccounts,
    contract: btcFtSwapContract,
    btcAmount: btcSwapAmount,
    ftAmount: ftSwapAmount,
    ftContract: ftContract,
    ftBuyerStacksAddress: buyerWallet.address,
    ftSellerBitcoinAddress: sellerDerivedBtcInfo.address,
    network: btc.networks.regtest,
    caller: sellerWallet
  });

  expect(swapId).toBeLessThan(1000);

  Logger.debug(`Created swap with ${swapId}`);

  // Make a BTC transaction
  //

  const paymentForFtResponse: PaymentResponse = await retry<PaymentResponse>(async function () {
    const paymentResponse = await makePayment(
      regtest,
      sellerDerivedBtcInfo.address,
      buyerWallet.mnemonic,
      btcSwapAmount
    );
    return paymentResponse;
  }, {
    delay: 1000,
    maxAttempts: 50,
    timeout: 80000
  });

  Logger.debug("Bitcoin payment details: ");
  console.log(JSON.stringify(paymentForFtResponse));

  const sellerBalance: number = await retry<number>(async function () {
    const btcBalance = await getBtcBalance(regtest, sellerDerivedBtcInfo.address);
    expect(btcBalance).toBeTruthy();
    return btcBalance;
  }, {
    delay: 1000,
    maxAttempts: 50,
    timeout: 80000
  });

  Logger.debug(`Seller account balance (BTC) is: ${sellerBalance}`);
  expect(sellerBalance).toBeTruthy();

  const baseRequest: ClarityBitcoinRequest = {
    accounts: clarinetAccounts,
    contract: clarityBitcoinContract,
  };

  const paramsFromTransaction = await paramsFromTx({
    ...baseRequest,
    btcTxId: paymentForFtResponse.txId,
  });

  const getReversedTxIdResponse = await getReversedTxId({
    ...baseRequest,
    txCv: paramsFromTransaction.txCV,
  });

  const merkleProof1 = await verifyMerkleProof({
    ...baseRequest,
    merkleRoot: paramsFromTransaction.block!.merkleroot,
    proofCV: paramsFromTransaction.proofCv,
    txId: paymentForFtResponse.txId,
  });

  const merkleProof2 = await verifyMerkleProof2({
    ...baseRequest,
    headerPartsCV: paramsFromTransaction.headerPartsCv,
    proofCV: paramsFromTransaction.proofCv,
    txCV: paramsFromTransaction.txCV,
  });

  const blockHeader = await verifyBlockHeader({
    ...baseRequest,
    headerParts: paramsFromTransaction.headerParts,
    stacksBlockHeight: paramsFromTransaction.stxHeight,
  });

  const blockHeader2 = await verifyBlockHeader2({
    ...baseRequest,
    blockCV: paramsFromTransaction.blockCv,
  });

  const wasTxMinedFromHexResponse = await wasTxMinedFromHex({
    ...baseRequest,
    blockCV: paramsFromTransaction.blockCv,
    proofCV: paramsFromTransaction.proofCv,
    txCV: paramsFromTransaction.txCV,
  });

  const parseBlockHeaderResponse = await parseBlockHeader({
    ...baseRequest,
    header: paramsFromTransaction.blockHeader,
  });

  const wasTxMinedResult = await wasTxMined({
    ...baseRequest,
    blockPartsCV: paramsFromTransaction.headerPartsCv,
    proofCV: paramsFromTransaction.proofCv,
    txCV: paramsFromTransaction.txCV
  });

  Logger.info('Was tx mined result: ');
  Logger.info(JSON.stringify(wasTxMinedResult));

  Logger.info("Params from transaction result: ");
  Logger.info(JSON.stringify(paramsFromTransaction));

  Logger.info("Get reversed tx id result: ");
  Logger.info(JSON.stringify(getReversedTxIdResponse));

  Logger.info("Merkleproof1 result: ");
  Logger.info(JSON.stringify(merkleProof1));

  Logger.info("Merkleproof2 result: ");
  Logger.info(JSON.stringify(merkleProof2));

  Logger.info("VerifyBlockHeader result: ");
  Logger.info(JSON.stringify(blockHeader));

  Logger.info("VerifyBlockHeader2 result: ");
  Logger.info(JSON.stringify(blockHeader2));

  Logger.info("Was tx mined from hex result: ");
  Logger.info(JSON.stringify(wasTxMinedFromHexResponse));

  Logger.info('Parse block header result: ');
  Logger.info(JSON.stringify(parseBlockHeaderResponse));

  const swap = await submitSwap({
    accounts: clarinetAccounts,
    contract: btcFtSwapContract,
    ftContract: ftContract,
    headerPartsCv: paramsFromTransaction.headerPartsCv,
    proofCv: paramsFromTransaction.proofCv,
    swapId: swapId,
    txPartsCv: paramsFromTransaction.txPartsCv,
    caller: buyerWallet,
  });

  Logger.info("Submitted swap with result: ");
  Logger.info(JSON.stringify(swap));

  expect(swap).toBe(true);
});

