import { generateWallet, getStxAddress } from "@stacks/wallet-sdk";
import { ClarinetAccounts } from "lib-shared";
import { getClarinetDevConfig } from ".";

export async function getClarinetAccounts(
  folder: string,
): Promise<ClarinetAccounts> {
  const devConfig = getClarinetDevConfig(folder);

  const accountEntries = await Promise.all(
    Object.entries(devConfig.accounts).map(async ([key, info]) => {
      const wallet = await generateWallet({
        secretKey: info.mnemonic,
        password: "",
      });

      const privateKey = wallet.accounts[0].stxPrivateKey;

      const [account] = wallet.accounts;
      const address = getStxAddress({ account });

      return [
        key,
        {
          ...info,
          address,
          privateKey,
        },
      ];
    }),
  );

  const accounts: ClarinetAccounts = Object.fromEntries(accountEntries);
  return accounts;
}
