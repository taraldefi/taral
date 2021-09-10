// created from 'create-ts-index'

import { StacksNetworkConfiguration } from "./stacks-network";

export * from "./stacks-network";

export const NETWORK = new StacksNetworkConfiguration();

export function getTransactionUrl(transaction: String, network: StacksNetworkConfiguration): string {
  return `${network.coreApiUrl}/extended/v1/tx/${transaction}`;
}
