import { ClarinetAccount, ClarinetAccounts } from "./types";

export function getWalletAtIndex(accounts: ClarinetAccounts, index: number): ClarinetAccount {
    var firstWallet = accounts[`wallet_${index}`];
    return firstWallet;
}
