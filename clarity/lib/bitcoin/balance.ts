import { getRpcClient } from "./client";
import { getTxOutSet } from "./transaction";
import { isValidBtcAddress } from "./validation";
import * as btc from 'bitcoinjs-lib';

export async function getBtcBalance(network: btc.Network, address: string) {
    if (!isValidBtcAddress(network, address)) {
        throw new Error(`Invalid BTC regtest address: ${address}`);
    }
    const client = getRpcClient();
    const txOutSet = await getTxOutSet(client, address);
    return txOutSet.total_amount;
}
