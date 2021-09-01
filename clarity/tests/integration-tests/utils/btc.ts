import { Logger } from "../../../lib";
import { RPCClient } from "rpc-bitcoin";
import { time } from "./helpers";
import { getRpcClient } from "./rpc-client";
import * as btc from 'bitcoinjs-lib';

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