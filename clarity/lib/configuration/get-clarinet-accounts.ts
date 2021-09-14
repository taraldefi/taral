import { generateWallet, getStxAddress } from "@stacks/wallet-sdk";
import { getClarinetTestnetConfig } from ".";
import { Logger } from "../logger";
import { ClarinetAccounts } from "./types";

export async function getClarinetAccounts(
  folder: string
): Promise<ClarinetAccounts> {
  const devConfig = await getClarinetTestnetConfig(folder);

  const accountEntries = await Promise.all(
    Object.entries(devConfig.accounts).map(async ([key, info]) => {
      Logger.debug(`Iteration key ${key}`);
      Logger.debug(`Mnemonic: ${info.mnemonic}`);

      const wallet = await generateWallet({
        secretKey: info.mnemonic,
        password: "password",
      });

      const privateKey = wallet.accounts[0].stxPrivateKey;

      Logger.debug(`generated wallet: ${JSON.stringify(wallet)}`);

      const [account] = wallet.accounts;
      const address = getStxAddress({ account });

      Logger.debug(`Address: ${address}`);

      return [
        key,
        {
          ...info,
          address,
          privateKey,
        },
      ];
    })
  );

  const accounts: ClarinetAccounts = Object.fromEntries(accountEntries);
  return accounts;
}


