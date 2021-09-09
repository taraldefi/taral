import * as stacksgen from "../clarity/lib/stacksgen";
import * as btc from "bitcoinjs-lib";
import { Transaction } from "bitcore-lib";
import { ApiProvider, IMetadata } from "../clarity/lib/providers";
import { ClarinetAccount, ClarinetAccounts, getClarinetAccounts } from "../clarity/lib/configuration";

import {
  Configuration,
  FaucetsApi,
  RunFaucetResponse,
} from "@stacks/blockchain-api-client";
import { PaymentResponse } from "../clarity/lib/bitcoin/models";
import crossfetch from "cross-fetch";
import { getBtcBalance } from "../clarity/lib/bitcoin/balance";
import { makePayment } from "../clarity/lib/bitcoin/payment";
import { paramsFromTx } from "../clarity/lib/swap/params-from-tx";
import { getReversedTxId } from "../clarity/lib/swap/get-txid";
import { verifyMerkleProof, verifyMerkleProof2 } from "../clarity/lib/swap/verify-merkle-proof";
import { parseBlockHeader, verifyBlockHeader, verifyBlockHeader2 } from "../clarity/lib/swap/block-header";
import { wasTxMined, wasTxMinedFromHex } from "../clarity/lib/swap/was-tx-mined";
import { ClarityBitcoinRequest } from "../clarity/lib/swap/base-request";
import { createBtcFtSwap } from "../clarity/lib/swap/create-swap";
import { submitSwap } from "../clarity/lib/swap/submit-swap";

import {
  BtcFtSwapContract,
  BtcNftSwapContract,
  ClarityBitcoinContract,
  contracts as taralContracts,
  NftTraitContract,
  Sip10FtStandardContract,
  TaralCoinContract,
} from "../clarity/generated/taral";
import { NETWORK } from "../clarity/configuration";
import { Logger } from "../clarity/lib/logger";

// Replace with client.estimatesmartfee() for testnet/mainnet
const REGTEST_FEE_RATE = 50;
const MIN_TX_CONFIRMATIONS = 1;

const BOB_BTC = "mr1iPkD9N3RJZZxXRk7xF9d36gffa6exNC";
const BOB_BTC_PK =
  "7287ba251d44a4d3fd9276c88ce34c5c52a038955511cccaf77e61068649c17801";
const BOB_STX = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
const BOB_MNEMONIC =
  "sell invite acquire kitten bamboo drastic jelly vivid peace spawn twice guilt pave pen trash pretty park cube fragile unaware remain midnight betray rebuild";

// # mnemonic = "sell invite acquire kitten bamboo drastic jelly vivid peace spawn twice guilt pave pen trash pretty park cube fragile unaware remain midnight betray rebuild"
// # secret_key: 7287ba251d44a4d3fd9276c88ce34c5c52a038955511cccaf77e61068649c17801
// # stx_address: ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5
// # btc_address: mr1iPkD9N3RJZZxXRk7xF9d36gffa6exNC
// address = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5"

const ALICE_BTC = "mqVnk6NPRdhntvfm4hh9vvjiRkFDUuSYsH";
const ALICE_BTC_PK =
  "753b7cc01a1a2e86221266a154af739463fce51219d97e4f856cd7200c3bd2a601";
const ALICE_STX = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";

async function main() {
 console.log('whatatat'); 
}

async function testSwap() {
  const cwd = `${process.cwd()}/clarity/`;
  const clarinetAccounts = await getClarinetAccounts(cwd);
  const deployer = clarinetAccounts.deployer;

  // Comment out for now the core and arkadiko contracts untill we'll need them
  // await ApiProvider.fromContracts(true, arkadikoContracts, network, {
  //   secretKey: deployer.privateKey,
  //   stacksAddress: deployer.address,
  // });

  const deployed = await ApiProvider.fromContracts(true, taralContracts, NETWORK, {
    secretKey: deployer.privateKey,
    stacksAddress: deployer.address,
  });

  const talToken = deployed.taralCoin.contract;
  const clarityBitcoinContract = deployed.clarityBitcoin.contract;
  const btcFtSwapContract = deployed.btcFtSwap.contract;

  const apiConfig = new Configuration({
    fetchApi: crossfetch,
    basePath: NETWORK.coreApiUrl,
  });

  const faucets = new FaucetsApi(apiConfig);
  const btcSwapAmount = 0.1;
  const ftSwapAmount = 1000;

  var faucetTransaction: RunFaucetResponse = await faucets.runFaucetBtc({
    address: BOB_BTC
  });

  if (!faucetTransaction.success) {
    Logger.error("Faucet transaction failed");
    return;
  }

  await new Promise((r) => setTimeout(r, 3000));

  const regtest = btc.networks.regtest;
  var balance = await getBtcBalance(regtest, BOB_BTC);
  console.log(`Account balance is: ${balance}`);

  const paymentResponse = await makePayment(regtest, ALICE_BTC, BOB_MNEMONIC, btcSwapAmount);

  console.log("Bitcoin payment details: ");
  console.log(JSON.stringify(paymentResponse));

  await new Promise((r) => setTimeout(r, 3000));

  var balance = await getBtcBalance(regtest, ALICE_BTC);
  console.log(`Alice account balance is ${balance}`);

  if (balance == 0) {
    Logger.error("Alice's balance is 0");
    return;
  }

  // Do the swap
  //

  
  const ftContract = `${clarinetAccounts.deployer.address}.taral-token`;
  const ftName = 'TARAL';

  const baseRequest: ClarityBitcoinRequest = {
    accounts: clarinetAccounts,
    contract: clarityBitcoinContract
  }

  const paramsFromTransaction = await paramsFromTx({
    ...baseRequest,
    btcTxId: paymentResponse.txId,
  });

  const results = await Promise.all([
    getReversedTxId({
      ...baseRequest,
      txCv: paramsFromTransaction.txCV
    }),

    verifyMerkleProof({
      ...baseRequest,
      merkleRoot: paramsFromTransaction.block!.merkleroot,
      proofCV: paramsFromTransaction.proofCv,
      txId: paymentResponse.rawTx
    }),
    verifyMerkleProof2({
      ...baseRequest,
      headerPartsCV: paramsFromTransaction.headerPartsCv,
      proofCV: paramsFromTransaction.proofCv,
      txCV: paramsFromTransaction.txCV
    }),
    verifyBlockHeader({
      ...baseRequest,
      headerParts: paramsFromTransaction.headerParts,
      stacksBlockHeight: paramsFromTransaction.stxHeight
    }),
    verifyBlockHeader2({
      ...baseRequest,
      blockCV: paramsFromTransaction.blockCv
    }),
    wasTxMinedFromHex({
      ...baseRequest,
      blockCV: paramsFromTransaction.blockCv,
      proofCV: paramsFromTransaction.proofCv,
      txCV: paramsFromTransaction.txCV
    }),
    parseBlockHeader({
      ...baseRequest,
      header: paramsFromTransaction.blockHeader
    }),
    wasTxMined({
      ...baseRequest,
      blockPartsCV: paramsFromTransaction.headerPartsCv,
      proofCV: paramsFromTransaction.proofCv,
      txCV: paramsFromTransaction.txCV
    }),
  ]);

  for(var i = 0; i < results.length; i++) {
    console.log(JSON.stringify(results[i]));
  }

  const swapId = await createBtcFtSwap({
    accounts: clarinetAccounts,
    contract: btcFtSwapContract,
    btcAmount: btcSwapAmount,
    ftAmount: ftSwapAmount,
    ftContract: ftContract,
    btcAddress: ALICE_BTC,
    stxAddress: BOB_STX
  });

  const swap = await submitSwap({
    accounts: clarinetAccounts,
    contract: btcFtSwapContract,
    ftContract: ftContract,
    headerPartsCv: paramsFromTransaction.headerPartsCv,
    proofCv: paramsFromTransaction.proofCv,
    swapId: swapId,
    txPartsCv: paramsFromTransaction.txPartsCv
  });

}


async function walletFromMnemonic() {
  var info = await stacksgen.generateKeys(
    "twice kind fence tip hidden tilt action fragile skin nothing glory cousin green tomorrow spring wrist shed math olympic multiply hip blue scout claw"
  );

  console.log(JSON.stringify(info));
  const regtest = btc.networks.testnet;
  const key = btc.ECPair.fromWIF(info.wif, regtest);
  var infoinfo = { key, address: getKeyAddress(key) };
  console.log(JSON.stringify(infoinfo));
}

function transactionTest() {
  const rawTx = '02000000019e2b183cb820937b46def62790e643997a97ebe9637a1936daca12942286bc6a000000006b4830450221008c5f820550bc5d8dd72fabffbe0bcab0e82505bc5ac53ecd8e29c6b3fc0932ba0220195e5a33d6bbd2d8a9f9a78e7e23082694cca976e05bd7b642ecb1fd4ca2f897012103cd2cfdbd2ad9332828a7a13ef62cb999e063421c708e863a7ffed71fb61c88c9ffffffff0280969800000000001976a9146d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce88ace03d6202000000001976a9147321b74e2b6a7e949e6c4ad313035b166509501788ac00000000';

  const transaction = new Transaction(rawTx);

  var inspect = transaction.inspect();

  console.log(inspect);

  transaction.inputs.forEach(element => {
    console.log('Input:');

    console.log(element.sequenceNumber);
    console.log(element.outputIndex);
    console.log(element.script.isWitnessPublicKeyHashOut());
    console.log(element.script.isPublicKeyHashOut());
    console.log(element.script.isPublicKeyHashIn());
    console.log(element.prevTxId.toString('hex'));
    console.log(element.output);
  });

  transaction.outputs.forEach(element => {
    console.log('Output: ');
    console.log(element.script.toHex());
    console.log(element.script.isWitnessPublicKeyHashOut());
    console.log(element.script.isPublicKeyHashOut());
    console.log(element.script.isPublicKeyHashIn());
    console.log(element.inspect());
  })
}

function getKeyAddress(key: btc.ECPairInterface): string {
  const { address } = btc.payments.p2pkh({
    pubkey: key.publicKey,
    network: key.network,
  });
  if (!address) {
    throw new Error("address generation failed");
  }
  return address;
}

// # mnemonic = "twice kind fence tip hidden tilt action fragile skin nothing glory cousin green tomorrow spring wrist shed math olympic multiply hip blue scout claw"
// # secret_key: 753b7cc01a1a2e86221266a154af739463fce51219d97e4f856cd7200c3bd2a601
// # stx_address: ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
// # btc_address: mqVnk6NPRdhntvfm4hh9vvjiRkFDUuSYsH
// address = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"

main();
