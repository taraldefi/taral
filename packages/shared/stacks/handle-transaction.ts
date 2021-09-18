import {
  broadcastTransaction,
  StacksTransaction,
  TxBroadcastResultOk,
  TxBroadcastResultRejected,
} from "@stacks/transactions";
import { StacksNetworkConfiguration } from "taral-configuration";
import { toJSON } from "..";
import { Logger } from "../logger";
import { getTransactionById, timeout } from "./utils";

export async function handleTransaction(
  transaction: StacksTransaction,
  network: StacksNetworkConfiguration
): Promise<TxBroadcastResultOk> {
  const result = await broadcastTransaction(transaction, network);
  Logger.debug(`Broadcast transaction result: ${toJSON(result)}`);

  if ((result as TxBroadcastResultRejected).error) {
    if (
      (result as TxBroadcastResultRejected).reason === "ContractAlreadyExists"
    ) {
      Logger.debug("Contract already deployed");
      return "" as TxBroadcastResultOk;
    } else {
      throw new Error(
        `failed to handle transaction ${transaction.txid()}: ${toJSON(result)}`
      );
    }
  }

  const processed = await processing(network, result as TxBroadcastResultOk);

  if (!processed) {
    throw new Error(
      `failed to process transaction ${transaction.txid}: transaction not found`
    );
  }

  Logger.debug(`Processed: ${processed}, Result: ${toJSON(result)}`);
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
  var value = await getTransactionById(tx, network);

  Logger.debug(`${count}`);

  if (value.tx_status === "success") {
    Logger.debug(`transaction ${tx} processed`);
    Logger.debug(toJSON(value));
    return true;
  }
  if (value.tx_status === "pending") {
    Logger.debug(toJSON(value));
  } else if (count === 3) {
    Logger.debug(toJSON(value));
  }

  if (count > 20) {
    Logger.debug("failed after 20 tries");
    Logger.debug(toJSON(value));
    return false;
  }

  await timeout(3000);
  return processing(network, tx, count + 1);
}
