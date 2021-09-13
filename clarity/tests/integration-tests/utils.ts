import { ClarinetAccount, IMetadata } from "../../../clarity/lib";
import { clarinetAccounts } from "./jest-setup";

export interface ITestContext {
  metadata: IMetadata;
}

export function getTestContext(): ITestContext {
  const firstWallet = getWallet();

  return {
    metadata: {
      discriminator: "metadata",
      sender: firstWallet.privateKey,
      address: firstWallet.address,
    },
  };
}

export function getWallet(): ClarinetAccount {
  return getWalletAtIndex(1);
}

export function getWalletAtIndex(index: number): ClarinetAccount {
  var firstWallet = clarinetAccounts[`wallet_${index}`];
  return firstWallet;
}
