import { signRequest } from "./sign-request";
import fetch from "node-fetch";
import { COINBASE_ENDPOINT } from "../../const";
import { convertSig } from "../../utils";
import { COINBASE_FILTER } from "./filter";
import { Logger } from "lib-shared";
import { IOraclePriceFeed } from "../../clients";
import { IOracleFeedRequest } from "../types";

const NAME = "coinbase-feed";

export async function retrieveCoinbaseOracleFeed(
  request: IOracleFeedRequest
): Promise<IOraclePriceFeed[]> {
  const path = "/oracle";
  const method = "GET";
  const body = "";
  const version = "2016-02-18";
  const sig = signRequest(
    method,
    path,
    body,
    request.coinbaseKey,
    request.coinbasePassPhrase,
    request.coinbaseSecretKey
  );

  // add signature and nonce to the header
  const headers = {
    "CB-ACCESS-SIGN": sig.signature,
    "CB-ACCESS-TIMESTAMP": sig.timestamp.toString(),
    "CB-ACCESS-KEY": request.coinbaseKey,
    "CB-VERSION": version,
    "CB-ACCESS-PASSPHRASE": request.coinbasePassPhrase,
    "Content-Type": "application/json",
    Accept: "application/json",
    "User-Agent": "coinbase-pro-node-client",
  };

  try {
    const json = await (
      await fetch(COINBASE_ENDPOINT, {
        method: "get",
        headers,
      })
    ).text();
    const data = JSON.parse(json);
    const keys = Object.keys(data.prices);
    const feed: IOraclePriceFeed[] = [];
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (COINBASE_FILTER.indexOf(key) !== -1) {
        feed.push({
          source: "coinbase",
          payload: Buffer.from(data.messages[i].slice(2), "hex"),
          signature: convertSig(data.signatures[i]),
        });
      }
    }
    return feed;
  } catch (e) {
    Logger.error(NAME, "Retrieve Coinbase Oracle Feed error", e);
    throw e;
  }
}
