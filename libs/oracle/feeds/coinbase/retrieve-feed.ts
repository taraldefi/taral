import { signRequest } from "./sign-request";
import {
  COINBASE_KEY,
  COINBASE_PASSPHRASE,
  COINBASE_SECRET,
} from "../../config";

import fetch from "node-fetch";

const NAME = "coinbase-feed";

import crypto from "crypto";
import { COINBASE_ENDPOINT } from "../../const";
import { convertSig } from "../../utils";
import { COINBASE_FILTER } from "./filter";
import { Logger } from "lib-shared";

export async function retrieveFeed() {
  const path = "/oracle";
  const method = "GET";
  const body = "";
  const version = undefined;
  const sig = signRequest(method, path, body);

  // add signature and nonce to the header
  const headers = {
    "CB-ACCESS-SIGN": sig.signature,
    "CB-ACCESS-TIMESTAMP": sig.timestamp.toString(),
    "CB-ACCESS-KEY": COINBASE_KEY,
    "CB-VERSION": "2016-02-18",
    "CB-ACCESS-PASSPHRASE": COINBASE_PASSPHRASE,
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
    const feed = [];
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (COINBASE_FILTER.indexOf(key) !== -1) {
        feed.push({
          src: "coinbase",
          msg: Buffer.from(data.messages[i].slice(2), "hex"),
          sig: convertSig(data.signatures[i]),
        });
      }
    }
    return feed;
  } catch (e) {
    Logger.error(NAME, "Retrieve Coinbase Oracle Feed error", e);
    throw e;
  }
}
