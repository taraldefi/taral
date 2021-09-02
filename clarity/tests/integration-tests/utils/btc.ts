import { Logger } from "../../../lib";
import { RPCClient } from "rpc-bitcoin";
import { time } from "./helpers";
import { getRpcClient } from "./rpc-client";
import * as btc from 'bitcoinjs-lib';
import { BOB_MNEMONIC, MIN_TX_CONFIRMATIONS } from "../utils";
import { coinSelect } from '../../../lib/coinselect';
import { REGTEST_FEE_RATE } from '../utils';
import Bluebird from 'bluebird';
import * as stacksgen from '../../../lib/stacksgen';

export async function getBobAccount(
    network: btc.Network,
): Promise<{ key: btc.ECPairInterface; address: string }> {
    var bobInfo = await stacksgen.generateKeys(BOB_MNEMONIC);
    const key = btc.ECPair.fromWIF(bobInfo.wif, network );
    return { key, address: getKeyAddress(key) };
}

export async function makePayment(
    network: btc.Network,
    address: string,
    /** Amount to send in BTC */
    amount: number
): Promise<{ txId: string; rawTx: string; txFee: number }> {

    if (!isValidBtcAddress(network, address)) {
        throw new Error(`Invalid BTC regtest address: ${address}`);
    }

    const client = getRpcClient();
    const bobsWallet = await getBobAccount(network);

    const faucetAmountSats = Math.round(amount * 1e8);

    const spendableUtxos = await getSpendableUtxos(client, bobsWallet.address);
    const totalSpendableAmount = spendableUtxos.reduce((amount, utxo) => amount + utxo.amount, 0);
    if (totalSpendableAmount < amount) {
        throw new Error(`not enough total amount in utxo set: ${totalSpendableAmount}`);
    }

    const candidateInputs = spendableUtxos.map(utxo => {
        return {
            script: Buffer.from(utxo.scriptPubKey, 'hex'),
            value: Math.round(utxo.amount * 1e8),
            txId: utxo.txid,
            vout: utxo.vout,
        };
    });

    const coinSelectResult = coinSelect(
        candidateInputs,
        [{ address: address, value: faucetAmountSats }],
        REGTEST_FEE_RATE
    );

    const psbt = new btc.Psbt({ network: network });

    for (const input of coinSelectResult.inputs) {
        const rawTx: string = await client.getrawtransaction({ txid: input.txId });
        psbt.addInput({
            hash: input.txId,
            index: input.vout,
            nonWitnessUtxo: Buffer.from(rawTx, 'hex'),
        });
    }

    coinSelectResult.outputs.forEach((output: { address: any; value: any; }) => {
        if (!output.address) {
            // output change address
            output.address = bobsWallet.address;
        }
        psbt.addOutput({ address: output.address, value: output.value });
    });

    psbt.signAllInputs(bobsWallet.key);
    if (!psbt.validateSignaturesOfAllInputs()) {
        throw new Error('invalid psbt signature');
    }
    psbt.finalizeAllInputs();

    const tx = psbt.extractTransaction();
    const txHex = tx.toHex();
    const txId = tx.getId();
    const sendTxResult: string = await time(
        () => client.sendrawtransaction({ hexstring: txHex }),
        ms => Logger.debug(`sendrawtransaction took ${ms}`)
    );

    if (sendTxResult !== txId) {
        throw new Error('Calculated txid does not match txid returned from RPC');
    }

    const feeAmount = coinSelectResult.fee / 1e8;

    return { txId: sendTxResult, rawTx: txHex, txFee: feeAmount };
}

async function getSpendableUtxos(client: RPCClient, address: string): Promise<TxOutUnspent[]> {
    const txOutSet = await getTxOutSet(client, address);
    const mempoolTxIds: string[] = await time(
        () => client.getrawmempool(),
        ms => Logger.debug(`getrawmempool took ${ms} ms`)
    );
    const rawTxs = await getRawTransactions(client, mempoolTxIds);
    const spentUtxos = rawTxs.map(tx => tx.vin).flat();
    const spendableUtxos = txOutSet.unspents.filter(
        utxo =>
            !spentUtxos.find(vin => vin.txid === utxo.txid && vin.vout === utxo.vout) &&
            txOutSet.height - utxo.height > MIN_TX_CONFIRMATIONS
    );
    return spendableUtxos;
}

async function getRawTransactions(client: RPCClient, txIds: string[]): Promise<GetRawTxResult[]> {
    const batchRawTxRes: GetRawTxResult[] = await time(
        async () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return await Bluebird.mapSeries(txIds, async (txId: any) =>
                client.getrawtransaction({ txid: txId, verbose: true })
            );
        },
        ms => Logger.debug(`batch getrawtransaction for ${txIds.length} txs took ${ms} ms`)
    );
    return batchRawTxRes;
}

export function getKeyAddress(key: btc.ECPairInterface): string {
    const { address } = btc.payments.p2pkh({
        pubkey: key.publicKey,
        network: key.network,
    });
    if (!address) {
        throw new Error('address generation failed');
    }
    return address;
}

export async function getTxOutSet(client: RPCClient, address: string): Promise<TxOutSet> {
    const txOutSet: TxOutSet = await time(
        () => client.scantxoutset({ action: 'start', scanobjects: [`addr(${address})`] }),
        ms => Logger.info(`scantxoutset for ${address} took ${ms} ms`)
    );
    if (!txOutSet.success) {
        Logger.error(`WARNING: scantxoutset did not immediately complete -- polling for progress...`);
        let scanProgress = true;
        do {
            scanProgress = await client.scantxoutset({
                action: 'status',
                scanobjects: [`addr(${address})`],
            });
        } while (scanProgress);
        return getTxOutSet(client, address);
    }
    return txOutSet;
}

function isValidBtcAddress(network: btc.Network, address: string): boolean {
    try {
        btc.address.toOutputScript(address, network);
        return true;
    } catch (error) {
        return false;
    }
}

export async function getBtcBalance(network: btc.Network, address: string) {
    if (!isValidBtcAddress(network, address)) {
        throw new Error(`Invalid BTC regtest address: ${address}`);
    }
    const client = getRpcClient();
    const txOutSet = await getTxOutSet(client, address);
    return txOutSet.total_amount;
}

interface TxOutSet {
    bestblock: string;
    height: number;
    success: boolean;
    total_amount: number;
    txouts: number;
    unspents: TxOutUnspent[];
}

interface TxOutUnspent {
    amount: number;
    desc: string;
    height: number;
    scriptPubKey: string;
    txid: string;
    vout: number;
}

interface GetRawTxResult {
    txid: string;
    hex: string;
    vin: {
        txid: string;
        vout: number;
        scriptSig: {
            hex: string;
        };
    }[];
    vout: {
        n: number;
        value: number;
        scriptPubKey: {
            addresses: string[];
            hex: string;
            type: string; // 'pubkeyhash'
        };
    }[];
}
