import {
  Configuration,
  FaucetsApi,
  RunFaucetResponse,
} from "@stacks/blockchain-api-client";
import { Logger } from "../../lib";
import { StacksNetwork } from "@stacks/network";
import { TransactionVersion } from "@stacks/transactions";
import crossfetch from "cross-fetch";
import { RPCClient } from "rpc-bitcoin";
import { NETWORK } from "../../configuration";
import * as btc from 'bitcoinjs-lib';

test("Request btc from faucet", async () => {
  const apiConfig = new Configuration({
    fetchApi: crossfetch,
    basePath: NETWORK.coreApiUrl,
  });

  const faucets = new FaucetsApi(apiConfig);

  var faucetTransaction: RunFaucetResponse = await faucets.runFaucetBtc({
    address: "mqVnk6NPRdhntvfm4hh9vvjiRkFDUuSYsH",
  });

  console.log(JSON.stringify(faucetTransaction));

  expect(faucetTransaction.success).toBe(true);

  const balance = await getBalanceWithWalletImport('mqVnk6NPRdhntvfm4hh9vvjiRkFDUuSYsH');

  expect(balance).toBeTruthy();
  console.log('account raw assets');
  console.log(JSON.stringify(balance));
});

async function getBalanceWithWalletImport(address: string): Promise<number> {
  const client = getRpcClient();
  const walletName = `recipient_wallet_${address}`;
  await client.createwallet({ wallet_name: walletName });
  await client.importaddress({ address: address, rescan: true }, walletName);
  const getBalanceResult: number = await client.getbalance({ include_watchonly: true }, walletName);
  return getBalanceResult;
}

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

export function getRpcClient(): RPCClient {
  const client = new RPCClient({
    url: 'http://localhost',
    port: parsePort('18443'),
    user: 'blockstack',
    pass: 'blockstacksystem',
    timeout: 120000,
  });
  return client;
}

interface TxOutUnspent {
  amount: number;
  desc: string;
  height: number;
  scriptPubKey: string;
  txid: string;
  vout: number;
}

interface TxOutSet {
  bestblock: string;
  height: number;
  success: boolean;
  total_amount: number;
  txouts: number;
  unspents: TxOutUnspent[];
}


function isValidBtcAddress(network: btc.Network, address: string): boolean {
  try {
    btc.address.toOutputScript(address, network);
    return true;
  } catch (error) {
    return false;
  }
}

export function stopwatch(): {
  /** Milliseconds since stopwatch was created. */
  getElapsed: () => number;
} {
  const start = process.hrtime();
  return {
    getElapsed: () => {
      const hrend = process.hrtime(start);
      return hrend[0] * 1000 + hrend[1] / 1000000;
    },
  };
}

export async function time<T>(
  fn: () => Promise<T>,
  onFinish: (elapsedMs: number) => void
): Promise<T> {
  const watch = stopwatch();
  try {
    return await fn();
  } finally {
    onFinish(watch.getElapsed());
  }
}

export async function getBtcBalance(network: btc.Network, address: string) {
  if (!isValidBtcAddress(network, address)) {
    throw new Error(`Invalid BTC regtest address: ${address}`);
  }
  const client = getRpcClient();
  const txOutSet = await getTxOutSet(client, address);
  return txOutSet.total_amount;
}

async function getTxOutSet(client: RPCClient, address: string): Promise<TxOutSet> {
  const txOutSet: TxOutSet = await time(
    () => client.scantxoutset({ action: 'start', scanobjects: [`addr(${address})`] }),
    ms => Logger.info(`scantxoutset for ${address} took ${ms} ms`)
  );
  if (!txOutSet.success) {
    Logger.error(`WARNING: scantxoutset did not immediately complete -- polling for progress...`);
    let scanProgress = true;
    do {
      scanProgress = await client.scantxoutset({
        action: 'status',
        scanobjects: [`addr(${address})`],
      });
    } while (scanProgress);
    return getTxOutSet(client, address);
  }
  return txOutSet;
}

export function parsePort(portVal: number | string | undefined): number | undefined {
  if (portVal === undefined) {
    return undefined;
  }
  if (/^[-+]?(\d+|Infinity)$/.test(portVal.toString())) {
    const port = Number(portVal);
    if (port < 1 || port > 65535) {
      throw new Error(`Port ${port} is invalid`);
    }
    return port;
  } else {
    throw new Error(`Port ${portVal} is invalid`);
  }
}
