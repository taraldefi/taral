// import {
//   FaucetsApi,
//   Configuration,
// } from "@stacks/blockchain-api-client";
// import { StacksNetwork } from "@stacks/network";
// import { TransactionVersion } from "@stacks/transactions";
// import crossfetch from "cross-fetch";
// import { NETWORK } from "../../configuration";

// test("Request btc from faucet", async () => {
//   const apiConfig = new Configuration({
//     fetchApi: crossfetch,
//     basePath: NETWORK.coreApiUrl,
//   });

//   const faucets = new FaucetsApi(apiConfig);

//   return faucets
//     .runFaucetStx({ address: 'msjUR7JMe3UBqm9b28CKySX6kSdXRguC8g' })
//     .then((faucetTx: any) => {
//       return JSONStringify({
//         txid: faucetTx.txId!,
//         transaction: generateExplorerTxPageUrl(
//           faucetTx.txId!.replace(/^0x/, ''),
//           NETWORK
//         ),
//       });
//     })
//     .catch((error: any) => error.toString());
// });

// export function generateExplorerTxPageUrl(txid: string, network: StacksNetwork): string {
//     if (network.version === TransactionVersion.Testnet) {
//       return `https://explorer.stacks.co/txid/0x${txid}?chain=testnet`;
//     } else {
//       return `https://explorer.stacks.co/txid/0x${txid}?chain=mainnet`;
//     }
//   }

// type AnyJson = string | number | boolean | null | { [property: string]: AnyJson } | AnyJson[];

// function JSONStringify(obj: AnyJson, stderr: boolean = false): string {
//     if ((!stderr && process.stdout.isTTY) || (stderr && process.stderr.isTTY)) {
//       return JSON.stringify(obj, null, 2);
//     } else {
//       return JSON.stringify(obj);
//     }
//   }
