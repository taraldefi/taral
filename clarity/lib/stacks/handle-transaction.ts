import {
    broadcastTransaction,
    StacksTransaction,
    TxBroadcastResultOk,
    TxBroadcastResultRejected,
} from "@stacks/transactions";
import { StacksNetworkConfiguration } from "../../configuration";
import { Logger } from "../logger";
import { getTransactionById, timeout } from "./utils";

export async function handleTransaction(
    transaction: StacksTransaction,
    network: StacksNetworkConfiguration
): Promise<TxBroadcastResultOk> {
    const result = await broadcastTransaction(transaction, network);
    if ((result as TxBroadcastResultRejected).error) {
        if (
            (result as TxBroadcastResultRejected).reason === "ContractAlreadyExists"
        ) {
            Logger.info("Contract already deployed");
            return "" as TxBroadcastResultOk;
        } else {
            throw new Error(
                `failed to handle transaction ${transaction.txid()}: ${JSON.stringify(
                    result
                )}`
            );
        }
    }

    const processed = await processing(
        network,
        result as TxBroadcastResultOk
    );

    if (!processed) {
        throw new Error(
            `failed to process transaction ${transaction.txid}: transaction not found`
        );
    }

    return result as TxBroadcastResultOk;
}

async function processing(
    network: StacksNetworkConfiguration,
    tx: string,
    count: number = 0
): Promise<boolean> {
    return processingWithSidecar(tx, count, network);
}

async function processingWithSidecar(
    tx: string,
    count: number = 0,
    network: StacksNetworkConfiguration
): Promise<boolean> {
    var value = await getTransactionById(network, tx);
    if (value.tx_status === "success") {
        return true;
    }

    if (count > 20) {
        return false;
    }

    await timeout(3000);
    return processing(network, tx, count + 1);
}


