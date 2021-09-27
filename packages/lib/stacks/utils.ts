import {
  getTransactionUrl,
  StacksNetworkConfiguration,
} from "taral-configuration";
import type { Transaction } from '@stacks/stacks-blockchain-api-types';

export async function timeout(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getTransactionById(
  txId: string,
  network: StacksNetworkConfiguration
): Promise<Transaction> {
  const url = getTransactionUrl(txId, network);
  var result = await fetch(url);
  var value = await result.json();

  return value;
}
