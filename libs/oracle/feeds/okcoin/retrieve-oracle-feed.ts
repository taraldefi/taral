import fetch from "node-fetch";
import { OKCOIN_ENDPOINT } from "../../const";
import { convertSig } from "../../utils";
import { OkCoinOracleResponse } from "./types";

export async function retrieveOKCoinOracleFeed() {
  const result = await fetch(OKCOIN_ENDPOINT);
  const json = (await result.json()) as OkCoinOracleResponse;
  const feed = [];
  for (let i = 0; i < json.messages.length; i++) {
    feed.push({
      src: "okcoin",
      msg: Buffer.from(json.messages[i].slice(2), "hex"),
      sig: convertSig(json.signatures[i]),
    });
  }
  return feed;
}
