import { StacksNetwork } from "@stacks/network";
import {
  getTransactionUrl,
} from "taral-configuration";

export async function timeout(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getTransactionById(
  txId: string,
  network: StacksNetwork
): Promise<any> {
  const url = getTransactionUrl(txId, network);
  var result = await fetch(url);
  var value = await result.json();

  return value;
}
