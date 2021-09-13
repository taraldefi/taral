import {
  broadcastTransaction,
  StacksTransaction,
  TxBroadcastResult,
  TxBroadcastResultOk,
  TxBroadcastResultRejected,
} from "@stacks/transactions";
import { Logger } from "..";
import { StacksNetworkConfiguration } from "../../configuration";
import { timeout } from "./utils";

export async function handleFunctionTransaction(
  transaction: StacksTransaction,
  network: StacksNetworkConfiguration,
  functionName: string,
  contractName: string
): Promise<TxBroadcastResult> {
  const result = await broadcastTransaction(transaction, network);
  if ((result as TxBroadcastResultRejected).error) {
    return result as TxBroadcastResultRejected;
  }

  const processed = await functionProcessing(
    network,
    result as TxBroadcastResultOk,
    functionName,
    contractName
  );

  if (!processed) {
    return result as TxBroadcastResultRejected;
  }

  return result as TxBroadcastResultOk;
}

async function functionProcessing(
  network: StacksNetworkConfiguration,
  tx: String,
  functionName: string,
  contractName: string,
  count: number = 0
): Promise<boolean> {
  return functionProcessingWithSidecar(
    tx,
    count,
    network,
    functionName,
    contractName
  );
}

async function functionProcessingWithSidecar(
  tx: String,
  count: number = 0,
  network: StacksNetworkConfiguration,
  functionName: string,
  contractName: string
): Promise<boolean> {
  const url = `${network.coreApiUrl}/extended/v1/tx/${tx}`;
  var result = await fetch(url);
  var value = await result.json();
  
  if (value.tx_status === "success") {
    Logger.debug(`Success calling transaction ${tx} on ${contractName}::${functionName} after ${count} tries`);
    Logger.debug(value);
    return true;
  }

  if (count > 60) {
    Logger.error(`Failed calling transaction ${tx} on ${contractName}::${functionName} after 60 retries`);
    Logger.error(value);
    return false;
  }

  await timeout(3000);
  return functionProcessing(network, tx, functionName, contractName, count + 1);
}
