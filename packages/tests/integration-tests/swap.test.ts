import {
  Configuration,
  FaucetsApi,
  RunFaucetResponse,
} from "@stacks/blockchain-api-client";
import * as btc from "bitcoinjs-lib";
import crossfetch from "cross-fetch";
import {
  createBtcFtSwap,
  getAccountFromMnemonic,
  getBtcBalance,
  getReversedTxId,
  getWalletAtIndex,
  HeaderPartsType,
  Logger,
  makePayment,
  paramsFromTx,
  ParamsFromTxResponse,
  parseBlockHeader,
  PaymentResponse,
  submitSwap,
  toJSON,
  verifyBlockHeader,
  verifyBlockHeader2,
  verifyMerkleProof,
  verifyMerkleProof2,
  wasTxMined,
  wasTxMinedFromHex,
} from "taral-shared";
import { NETWORK } from "../../configuration";
import { retry } from "../utils/retry";
import {
  btcFtSwapContract,
  clarinetAccounts,
  clarityBitcoinContract,
} from "./jest-setup";

const NAME = "swap-test";

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

  const clarityBitcoin = clarityBitcoinContract(clarinetAccounts.deployer);
  const claritySwap = btcFtSwapContract(buyerWallet);

  const sellerDerivedBtcInfo = await getAccountFromMnemonic(
    btc.networks.regtest,
    sellerWallet.mnemonic
  );

  Logger.debug(NAME, `Seller address ${sellerDerivedBtcInfo.address}`);

  const buyerDerivedBtcInfo = await getAccountFromMnemonic(
    btc.networks.regtest,
    buyerWallet.mnemonic
  );

  Logger.debug(NAME, `Buyer address ${buyerDerivedBtcInfo.address}`);

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
      Logger.debug(NAME, `Account balance is: ${btcBalance}`);
      return btcBalance;
    },
    {
      delay: 1000,
      maxAttempts: 50,
      timeout: 80000,
    }
  );

  Logger.debug(NAME, `Buyer account balance (BTC) is: ${buyerBalance}`);

  expect(buyerBalance).toBeTruthy();

  Logger.debug(NAME, "Calling create swap");
  const swapId = await createBtcFtSwap({
    contract: btcFtSwapContract(sellerWallet),
    btcAmount: btcSwapAmount,
    ftAmount: ftSwapAmount,
    ftContract: ftContract,
    ftBuyerStacksAddress: buyerWallet.address,
    ftSellerBitcoinAddress: sellerDerivedBtcInfo.address,
    network: btc.networks.regtest,
  });

  expect(swapId).toBeLessThan(1000);

  Logger.debug(NAME, `Created swap with ${swapId}`);

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

  Logger.debug(NAME, "Bitcoin payment details: ");
  console.log(toJSON(paymentForFtResponse));

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

  Logger.debug(NAME, `Seller account balance (BTC) is: ${sellerBalance}`);
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
      const paramsFromTransaction: ParamsFromTxResponse = await paramsFromTx({
        contract: clarityBitcoin,
        btcTxId: paymentForFtResponse.txId,
      });

      const getReversedTxIdResponse: string = await getReversedTxId({
        contract: clarityBitcoin,
        txCv: paramsFromTransaction.txCV,
      });

      const merkleProof1: string = await verifyMerkleProof({
        contract: clarityBitcoin,
        merkleRoot: paramsFromTransaction.block!.merkleroot,
        proofCV: paramsFromTransaction.proofCv,
        txId: paymentForFtResponse.txId,
      });

      const merkleProof2: string = await verifyMerkleProof2({
        contract: clarityBitcoin,
        headerPartsCV: paramsFromTransaction.headerPartsCv,
        proofCV: paramsFromTransaction.proofCv,
        txCV: paramsFromTransaction.txCV,
      });

      const blockHeader: boolean = await verifyBlockHeader({
        contract: clarityBitcoin,
        headerParts: paramsFromTransaction.headerParts,
        stacksBlockHeight: paramsFromTransaction.stxHeight,
      });

      const blockHeader2: boolean = await verifyBlockHeader2({
        contract: clarityBitcoin,
        blockCV: paramsFromTransaction.blockCv,
      });

      const wasTxMinedFromHexResponse: boolean = await wasTxMinedFromHex({
        contract: clarityBitcoin,
        blockCV: paramsFromTransaction.blockCv,
        proofCV: paramsFromTransaction.proofCv,
        txCV: paramsFromTransaction.txCV,
      });

      const parseBlockHeaderResponse: HeaderPartsType = await parseBlockHeader({
        contract: clarityBitcoin,
        header: paramsFromTransaction.blockHeader,
      });

      const wasTxMinedResult: boolean = await wasTxMined({
        contract: clarityBitcoin,
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

  Logger.info(NAME, "Was tx mined result: ", validationResults[8]);
  Logger.info(NAME, "Params from transaction result: ", validationResults[0]);
  Logger.info(NAME, "Get reversed tx id result: ", validationResults[1]);
  Logger.info(NAME, "Merkleproof1 result: ", validationResults[2]);
  Logger.info(NAME, "Merkleproof2 result: ", validationResults[3]);
  Logger.info(NAME, "VerifyBlockHeader result: ", validationResults[4]);
  Logger.info(NAME, "VerifyBlockHeader2 result: ", validationResults[5]);
  Logger.info(NAME, "Was tx mined from hex result: ", validationResults[6]);
  Logger.info(NAME, "Parse block header result: ", validationResults[7]);

  const swap = await submitSwap({
    contract: claritySwap,
    ftContract: ftContract,
    headerPartsCv: paramsFromTransaction.headerPartsCv,
    proofCv: paramsFromTransaction.proofCv,
    swapId: swapId,
    txPartsCv: paramsFromTransaction.txPartsCv,
  });

  Logger.info(NAME, "Submitted swap with result: ", swap);
  expect(swap).toBe(true);
}, 3000000);
