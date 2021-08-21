import { ClarinetAccount, IMetadata } from "clarity/lib";
import { clarinetAccounts } from "./jest-setup";

export interface ITestContext {
    callFunctionMetadata: IMetadata;
    callReadonlyFunctionMetadata: IMetadata;
    stacksAddress: string;
}

export function getTestContext(): ITestContext {
    const firstWallet = getWallet();

    return {
        callFunctionMetadata: {
            discriminator: 'metadata',
            sender: firstWallet.privateKey
        },
        callReadonlyFunctionMetadata: {
            discriminator: 'metadata',
            sender: firstWallet.address
        },
        stacksAddress: firstWallet.address
    };
}

export function getWallet(): ClarinetAccount {
    return getWalletAtIndex(1);
}

function getWalletAtIndex(index: number): ClarinetAccount {
  var firstWallet = clarinetAccounts[`wallet_${index}`];
  return firstWallet;
}
