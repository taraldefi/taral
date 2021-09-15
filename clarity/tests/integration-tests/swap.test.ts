import {
  Configuration,
  FaucetsApi,
  RunFaucetResponse,
} from "@stacks/blockchain-api-client";
import * as btc from "bitcoinjs-lib";
import { getWalletAtIndex } from "../../lib/configuration/get-wallet";
import { HeaderPartsType } from "../../lib/swap/types";
import crossfetch from "cross-fetch";
import { NETWORK } from "../../configuration";
import { Logger } from "../../lib";
import { getBtcBalance } from "../../lib/bitcoin/balance";
import { PaymentResponse } from "../../lib/bitcoin/models";
import { getAccountFromMnemonic, makePayment } from "../../lib/bitcoin/payment";
import { ClarityBitcoinRequest } from "../../lib/swap/base-request";
import {
  parseBlockHeader,
  verifyBlockHeader,
  verifyBlockHeader2,
} from "../../lib/swap/block-header";
import { createBtcFtSwap } from "../../lib/swap/create-swap";
import { getReversedTxId } from "../../lib/swap/get-txid";
import {
  paramsFromTx,
  ParamsFromTxResponse,
} from "../../lib/swap/params-from-tx";
import { submitSwap } from "../../lib/swap/submit-swap";
import {
  verifyMerkleProof,
  verifyMerkleProof2,
} from "../../lib/swap/verify-merkle-proof";
import { wasTxMined, wasTxMinedFromHex } from "../../lib/swap/was-tx-mined";
import { retry } from "../utils/retry";
import {
  btcFtSwapContract,
  clarinetAccounts,
  clarityBitcoinContract,
} from "./jest-setup";

test("make btc transaction", async () => {
  const regtest = btc.networks.regtest;
  const ftContract = `${clarinetAccounts.deployer.address}.taral-coin`;
  const btcSwapAmount = 0.1;
  const ftSwapAmount = 3000;

  const apiConfig = new Configuration({
    fetchApi: crossfetch,
    basePath: NETWORK.coreApiUrl,
  });

  const sellerWallet = getWalletAtIndex(clarinetAccounts, 2);

  const buyerWallet = getWalletAtIndex(clarinetAccounts, 6);

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

  const buyerBalance: number = await retry<number>(
    async function () {
      const btcBalance = await getBtcBalance(
        regtest,
        buyerDerivedBtcInfo.address
      );
      expect(btcBalance).toBeTruthy();
      Logger.debug(`Account balance is: ${btcBalance}`);
      return btcBalance;
    },
    {
      delay: 1000,
      maxAttempts: 50,
      timeout: 80000,
    }
  );

  Logger.debug(`Buyer account balance (BTC) is: ${buyerBalance}`);

  expect(buyerBalance).toBeTruthy();

  Logger.debug("Calling create swap");
  const swapId = await createBtcFtSwap({
    accounts: clarinetAccounts,
    contract: btcFtSwapContract(sellerWallet),
    btcAmount: btcSwapAmount,
    ftAmount: ftSwapAmount,
    ftContract: ftContract,
    ftBuyerStacksAddress: buyerWallet.address,
    ftSellerBitcoinAddress: sellerDerivedBtcInfo.address,
    network: btc.networks.regtest,
  });

  expect(swapId).toBeLessThan(1000);

  Logger.debug(`Created swap with ${swapId}`);

  // Make a BTC transaction
  //

  const paymentForFtResponse: PaymentResponse = await retry<PaymentResponse>(
    async function () {
      const paymentResponse = await makePayment(
        regtest,
        sellerDerivedBtcInfo.address,
        buyerWallet.mnemonic,
        btcSwapAmount
      );
      return paymentResponse;
    },
    {
      delay: 1000,
      maxAttempts: 50,
      timeout: 80000,
    }
  );

  Logger.debug("Bitcoin payment details: ");
  console.log(JSON.stringify(paymentForFtResponse));

  const sellerBalance: number = await retry<number>(
    async function () {
      const btcBalance = await getBtcBalance(
        regtest,
        sellerDerivedBtcInfo.address
      );
      expect(btcBalance).toBeTruthy();
      return btcBalance;
    },
    {
      delay: 1000,
      maxAttempts: 50,
      timeout: 80000,
    }
  );

  Logger.debug(`Seller account balance (BTC) is: ${sellerBalance}`);
  expect(sellerBalance).toBeTruthy();

  type transactionChecks = [
    ParamsFromTxResponse,
    string,
    string,
    string,
    boolean,
    boolean,
    boolean,
    HeaderPartsType,
    boolean
  ];

  const validationResults: transactionChecks = await retry<transactionChecks>(
    async function () {
      const baseRequest: ClarityBitcoinRequest = {
        accounts: clarinetAccounts,
        contract: clarityBitcoinContract(clarinetAccounts.deployer),
      };

      const paramsFromTransaction: ParamsFromTxResponse = await paramsFromTx({
        ...baseRequest,
        btcTxId: paymentForFtResponse.txId,
      });

      const getReversedTxIdResponse: string = await getReversedTxId({
        ...baseRequest,
        txCv: paramsFromTransaction.txCV,
      });

      console.log("block::::::: ");
      console.log(JSON.stringify(paramsFromTransaction.block));

      const merkleProof1: string = await verifyMerkleProof({
        ...baseRequest,
        merkleRoot: paramsFromTransaction.block!.merkleroot,
        proofCV: paramsFromTransaction.proofCv,
        txId: paymentForFtResponse.txId,
      });

      const merkleProof2: string = await verifyMerkleProof2({
        ...baseRequest,
        headerPartsCV: paramsFromTransaction.headerPartsCv,
        proofCV: paramsFromTransaction.proofCv,
        txCV: paramsFromTransaction.txCV,
      });

      const blockHeader: boolean = await verifyBlockHeader({
        ...baseRequest,
        headerParts: paramsFromTransaction.headerParts,
        stacksBlockHeight: paramsFromTransaction.stxHeight,
      });

      const blockHeader2: boolean = await verifyBlockHeader2({
        ...baseRequest,
        blockCV: paramsFromTransaction.blockCv,
      });

      const wasTxMinedFromHexResponse: boolean = await wasTxMinedFromHex({
        ...baseRequest,
        blockCV: paramsFromTransaction.blockCv,
        proofCV: paramsFromTransaction.proofCv,
        txCV: paramsFromTransaction.txCV,
      });

      const parseBlockHeaderResponse: HeaderPartsType = await parseBlockHeader({
        ...baseRequest,
        header: paramsFromTransaction.blockHeader,
      });

      const wasTxMinedResult: boolean = await wasTxMined({
        ...baseRequest,
        blockPartsCV: paramsFromTransaction.headerPartsCv,
        proofCV: paramsFromTransaction.proofCv,
        txCV: paramsFromTransaction.txCV,
      });

      return [
        paramsFromTransaction,
        getReversedTxIdResponse,
        merkleProof1,
        merkleProof2,
        blockHeader,
        blockHeader2,
        wasTxMinedFromHexResponse,
        parseBlockHeaderResponse,
        wasTxMinedResult,
      ];
    },
    {
      delay: 6000,
      maxAttempts: 50,
      timeout: 80000,
    }
  );

  const paramsFromTransaction: ParamsFromTxResponse = validationResults[0];

  Logger.info("Was tx mined result: ");
  Logger.info(JSON.stringify(validationResults[8]));

  Logger.info("Params from transaction result: ");
  Logger.info(JSON.stringify(validationResults[0]));

  Logger.info("Get reversed tx id result: ");
  Logger.info(JSON.stringify(validationResults[1]));

  Logger.info("Merkleproof1 result: ");
  Logger.info(JSON.stringify(validationResults[2]));

  Logger.info("Merkleproof2 result: ");
  Logger.info(JSON.stringify(validationResults[3]));

  Logger.info("VerifyBlockHeader result: ");
  Logger.info(JSON.stringify(validationResults[4]));

  Logger.info("VerifyBlockHeader2 result: ");
  Logger.info(JSON.stringify(validationResults[5]));

  Logger.info("Was tx mined from hex result: ");
  Logger.info(JSON.stringify(validationResults[6]));

  Logger.info("Parse block header result: ");
  Logger.info(JSON.stringify(validationResults[7]));

  const swap = await submitSwap({
    accounts: clarinetAccounts,
    contract: btcFtSwapContract(buyerWallet),
    ftContract: ftContract,
    headerPartsCv: paramsFromTransaction.headerPartsCv,
    proofCv: paramsFromTransaction.proofCv,
    swapId: swapId,
    txPartsCv: paramsFromTransaction.txPartsCv,
  });

  Logger.info("Submitted swap with result: ");
  Logger.info(JSON.stringify(swap));

  expect(swap).toBe(true);
});
