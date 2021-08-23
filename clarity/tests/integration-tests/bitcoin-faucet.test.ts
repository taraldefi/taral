import {
  FaucetsApi,
  Configuration,
  RunFaucetResponse,
} from "@stacks/blockchain-api-client";
import { StacksNetwork } from "@stacks/network";
import { TransactionVersion } from "@stacks/transactions";
import crossfetch from "cross-fetch";
import { NETWORK } from "../../configuration";

test("Request btc from faucet", async () => {
  const apiConfig = new Configuration({
    fetchApi: crossfetch,
    basePath: NETWORK.coreApiUrl,
  });

  const faucets = new FaucetsApi(apiConfig);

  var faucetTransaction: RunFaucetResponse = await faucets.runFaucetBtc({
    address: "mqVnk6NPRdhntvfm4hh9vvjiRkFDUuSYsH",
  });

  var transactionID = faucetTransaction.txId!;

  var transaction = generateExplorerTxPageUrl(
    faucetTransaction.txId!.replace(/^0x/, ""),
    NETWORK
  );

  console.log(`Transaction ID ${transactionID}`);

  console.log(`Transaction URL ${transaction}`);
});

export function generateExplorerTxPageUrl(
  txid: string,
  network: StacksNetwork
): string {
  if (network.version === TransactionVersion.Testnet) {
    return `https://explorer.stacks.co/txid/0x${txid}?chain=testnet`;
  } else {
    return `https://explorer.stacks.co/txid/0x${txid}?chain=mainnet`;
  }
}
