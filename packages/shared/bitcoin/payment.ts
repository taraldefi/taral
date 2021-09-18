import * as btc from "bitcoinjs-lib";
import { coinSelect } from "../coinselect";
import { Logger } from "../logger";
import * as stacksgen from "../stacksgen";
import { makeBuffer } from "../swap/utils";
import { getRpcClient } from "./client";
import { REGTEST_FEE_RATE } from "./constants";
import { time } from "./helpers";
import { getKeyAddress, getSpendableUtxos } from "./transaction";
import { PaymentResponse } from "./types";
import { isValidBtcAddress } from "./validation";

export async function getAccountFromMnemonic(
  network: btc.Network,
  mnemonic: string
): Promise<{ key: btc.ECPairInterface; address: string }> {
  var keys = await stacksgen.generateKeys(mnemonic);
  const key = btc.ECPair.fromWIF(keys.wif, network);
  return { key, address: getKeyAddress(key) };
}

export async function makePayment(
  network: btc.Network,
  address: string,
  payerMnemonic: string,
  /** Amount to send in BTC */
  amount: number
): Promise<PaymentResponse> {
  if (!isValidBtcAddress(network, address)) {
    throw new Error(`Invalid BTC regtest address: ${address}`);
  }

  const client = getRpcClient();
  const bobsWallet = await getAccountFromMnemonic(network, payerMnemonic);

  const satsAmount = Math.round(amount * 1e8);

  const spendableUtxos = await getSpendableUtxos(client, bobsWallet.address);
  const totalSpendableAmount = spendableUtxos.reduce(
    (amount, utxo) => amount + utxo.amount,
    0
  );
  if (totalSpendableAmount < amount) {
    throw new Error(
      `not enough total amount in utxo set: ${totalSpendableAmount}`
    );
  }

  const candidateInputs = spendableUtxos.map((utxo) => {
    return {
      script: makeBuffer(utxo.scriptPubKey),
      value: Math.round(utxo.amount * 1e8),
      txId: utxo.txid,
      vout: utxo.vout,
    };
  });

  const coinSelectResult = coinSelect(
    candidateInputs,
    [{ address: address, value: satsAmount }],
    REGTEST_FEE_RATE
  );

  const psbt = new btc.Psbt({ network: network });

  for (const input of coinSelectResult.inputs) {
    const rawTx: string = await client.getrawtransaction({ txid: input.txId });
    psbt.addInput({
      hash: input.txId,
      index: input.vout,
      nonWitnessUtxo: makeBuffer(rawTx),
    });
  }

  coinSelectResult.outputs.forEach((output: { address: any; value: any }) => {
    if (!output.address) {
      // output change address
      output.address = bobsWallet.address;
    }
    psbt.addOutput({ address: output.address, value: output.value });
  });

  psbt.signAllInputs(bobsWallet.key);
  if (!psbt.validateSignaturesOfAllInputs()) {
    throw new Error("invalid psbt signature");
  }
  psbt.finalizeAllInputs();

  const tx = psbt.extractTransaction();
  const txHex = tx.toHex();
  const txId = tx.getId();
  const sendTxResult: string = await time(
    () => client.sendrawtransaction({ hexstring: txHex }),
    (ms) => Logger.debug(`sendrawtransaction took ${ms}`)
  );

  if (sendTxResult !== txId) {
    throw new Error("Calculated txid does not match txid returned from RPC");
  }

  const feeAmount = coinSelectResult.fee / 1e8;

  const result: PaymentResponse = {
    txId: sendTxResult,
    rawTx: txHex,
    txFee: feeAmount,
  };

  return result;
}
