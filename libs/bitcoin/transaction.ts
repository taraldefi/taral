import * as btc from "bitcoinjs-lib";
import Bluebird from "bluebird";
import * as ecPair from "ecpair";
import { Logger } from "lib-shared";
import { RPCClient } from "rpc-bitcoin";
import { MIN_TX_CONFIRMATIONS } from "./constants";
import { time } from "./helpers";
import { GetRawTxResult, TxOutSet, TxOutUnspent } from "./types";

export async function getSpendableUtxos(
  client: RPCClient,
  address: string
): Promise<TxOutUnspent[]> {
  const txOutSet = await getTxOutSet(client, address);
  const mempoolTxIds: string[] = await time(
    () => client.getrawmempool(),
    (ms) =>
      Logger.debug(
        "get-spendable-utxos",
        `getrawmempool took ${ms} milliseconds.`
      )
  );
  const rawTxs = await getRawTransactions(client, mempoolTxIds);
  const spentUtxos = rawTxs.map((tx) => tx.vin).flat();
  const spendableUtxos = txOutSet.unspents.filter(
    (utxo) =>
      !spentUtxos.find(
        (vin) => vin.txid === utxo.txid && vin.vout === utxo.vout
      ) && txOutSet.height - utxo.height > MIN_TX_CONFIRMATIONS
  );
  return spendableUtxos;
}

export async function getRawTransaction(
  client: RPCClient,
  txId: string
): Promise<GetRawTxResult> {
  const rawTransaction: GetRawTxResult = await client.getrawtransaction({
    txid: txId,
    verbose: true,
  });

  Logger.debug("get-raw-transaction", "Received result ", rawTransaction);

  return rawTransaction;
}

export async function decodeScript(
  client: RPCClient,
  script: string
): Promise<any> {
  const decodedResult = await client.decodescript({
    hexstring: script,
  });

  return decodedResult;
}

export async function decodeRawTransaction(
  client: RPCClient,
  rawTx: string
): Promise<any> {
  const decodedResult = await client.decoderawtransaction({
    hexstring: rawTx,
  });

  Logger.debug("decode-raw-transaction", "Received result ", decodedResult);

  return decodedResult;
}

export async function getRawTransactions(
  client: RPCClient,
  txIds: string[]
): Promise<GetRawTxResult[]> {
  const batchRawTxRes: GetRawTxResult[] = await time(
    async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return await Bluebird.mapSeries(txIds, async (txId: any) =>
        client.getrawtransaction({ txid: txId, verbose: true })
      );
    },
    (ms) =>
      Logger.debug(
        "get-raw-transactions",
        `batch getrawtransaction for ${txIds.length} txs took ${ms} ms`
      )
  );
  return batchRawTxRes;
}

export function getKeyAddress(key: ecPair.ECPairInterface): string {
  const { address } = btc.payments.p2pkh({
    pubkey: key.publicKey,
    network: key.network,
  });
  if (!address) {
    throw new Error("address generation failed");
  }
  return address;
}

export async function getTxOutSet(
  client: RPCClient,
  address: string
): Promise<TxOutSet> {
  const txOutSet: TxOutSet = await time(
    () =>
      client.scantxoutset({
        action: "start",
        scanobjects: [`addr(${address})`],
      }),
    (ms) =>
      Logger.debug(
        "get-transaction-outset",
        `scantxoutset for ${address} took ${ms} ms`
      )
  );
  if (!txOutSet.success) {
    Logger.warn(
      "get-transaction-outset",
      "scantxoutset did not immediately complete -- polling for progress..."
    );
    let scanProgress = true;

    do {
      scanProgress = await client.scantxoutset({
        action: "status",
        scanobjects: [`addr(${address})`],
      });
    } while (scanProgress);
    return getTxOutSet(client, address);
  }
  return txOutSet;
}
