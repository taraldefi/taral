import { StacksNetwork } from "@stacks/network";
import {
  broadcastTransaction,
  StacksTransaction,
  TxBroadcastResult,
  TxBroadcastResultOk,
  TxBroadcastResultRejected,
} from "@stacks/transactions";
import { Logger, toJSON } from "lib-shared";
import { getTransactionById, timeout } from "./utils";

const NAME = "handle-transaction";

export async function handleTransaction(
  transaction: StacksTransaction,
  network: StacksNetwork
): Promise<TxBroadcastResultOk> {
  const result = await broadcastTransaction(transaction, network);
  Logger.debug(NAME, "Broadcast transaction result: ", result);

  const success = isBroadcastSuccessful(result);

  if (!success) {
    if (
      (result as TxBroadcastResultRejected).reason === "ContractAlreadyExists"
    ) {
      Logger.debug(NAME, "Contract already deployed");

      return result as TxBroadcastResultOk;
    } else {
      throw new Error(
        `failed to handle transaction ${transaction.txid()}: ${toJSON(result)}`
      );
    }
  }

  const processed = await processing(network, result.txid);

  if (!processed) {
    throw new Error(
      `failed to process transaction ${transaction.txid}: transaction not found`
    );
  }

  Logger.debug(NAME, `Processed: ${processed}, Result: `, result);
  return result as TxBroadcastResultOk;
}

function isBroadcastSuccessful(result: TxBroadcastResult): boolean {
  if (result.error || !result.txid) {
    return false;
  } else {
    return true;
  }
}

async function processing(
  network: StacksNetwork,
  tx: string,
  count = 0
): Promise<boolean> {
  return processingWithSidecar(tx, count, network);
}

async function processingWithSidecar(
  tx: string,
  count = 0,
  network: StacksNetwork
): Promise<boolean> {
  const value = await getTransactionById(tx, network);

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
