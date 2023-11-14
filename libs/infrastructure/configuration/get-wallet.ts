import { ClarinetAccount, ClarinetAccounts } from "lib-shared";

export function getWalletAtIndex(
  accounts: ClarinetAccounts,
  index: number,
): ClarinetAccount {
  const firstWallet = accounts[`wallet_${index}`];
  return firstWallet;
}
