// created from 'create-ts-index'

import { StacksNetwork, StacksTestnet } from "@stacks/network";

export const NETWORK: StacksNetwork = new StacksTestnet({
  url: "http://localhost:3999",
});

// export const NETWORK: StacksNetwork = new StacksMocknet({
//   url: "http://localhost:3999",
// });

export function getTransactionUrl(
  transaction: string,
  network: StacksNetwork
): string {
  return `${network.coreApiUrl}/extended/v1/tx/${transaction}`;
}
