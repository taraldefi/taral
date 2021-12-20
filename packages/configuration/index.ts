// created from 'create-ts-index'

import { StacksNetwork, StacksTestnet } from "@stacks/network";

export const NETWORK: StacksTestnet = new StacksTestnet({
  url: "http://localhost:3999",
});

export function getTransactionUrl(
  transaction: String,
  network: StacksNetwork
): string {
  return `${network.coreApiUrl}/extended/v1/tx/${transaction}`;
}