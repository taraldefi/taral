import {
  broadcastTransaction,
  StacksTransaction,
  TxBroadcastResultOk,
  TxBroadcastResultRejected,
} from "@stacks/transactions";
import { StacksNetworkConfiguration } from "taral-configuration";
import { toJSON } from "lib-shared";
import { Logger } from "lib-shared";
import { getTransactionById, timeout } from "./utils";

const NAME = "handle-transaction";

export async function handleTransaction(
  transaction: StacksTransaction,
  network: StacksNetworkConfiguration
): Promise<TxBroadcastResultOk> {
  const result = await broadcastTransaction(transaction, network);
  Logger.debug(NAME, "Broadcast transaction result: ", result);

  if ((result as TxBroadcastResultRejected).error) {
    if (
      (result as TxBroadcastResultRejected).reason === "ContractAlreadyExists"
    ) {
      Logger.debug(NAME, "Contract already deployed");
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

  Logger.debug(NAME, `Processed: ${processed}, Result: `, result);
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

  if (value.tx_status === "success") {
    Logger.debug(
      NAME,
      `transaction ${tx} processed with retry count ${count}`,
      value
    );
    return true;
  }
  if (value.tx_status === "pending") {
    Logger.debug(NAME, "Transaction execution pending ", value);
  }

  if (count > 20) {
    Logger.debug(NAME, "failed after 20 tries", value);
    return false;
  }

  await timeout(3000);
  return processing(network, tx, count + 1);
}
