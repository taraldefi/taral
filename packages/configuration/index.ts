// created from 'create-ts-index'

import { StacksTestnet } from "@stacks/network";
import { StacksNetworkConfiguration } from "./stacks-network";

export * from "./stacks-network";

export const NETWORK = new StacksNetworkConfiguration();

export function getTransactionUrl(
  transaction: String,
  network: StacksNetworkConfiguration
): string {
  return `${network.coreApiUrl}/extended/v1/tx/${transaction}`;
}

export const TESTNET: StacksTestnet = new StacksTestnet({
  url: "http://localhost:3999",
});
