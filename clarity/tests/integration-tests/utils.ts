import { ClarinetAccount } from "../../../clarity/lib";
import { clarinetAccounts } from "./jest-setup";

export function getWalletAtIndex(index: number): ClarinetAccount {
  var firstWallet = clarinetAccounts[`wallet_${index}`];
  return firstWallet;
}
