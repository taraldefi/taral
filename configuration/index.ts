// created from 'create-ts-index'

import { StacksNetworkConfiguration } from "./stacks-network";

export * from "./stacks-network";
export * from "./testnet";

export const NETWORK = new StacksNetworkConfiguration();

export function getTransactionUrl(transaction: String): string {
  return `${NETWORK.coreApiUrl}/extended/v1/tx/${transaction}`;
}
