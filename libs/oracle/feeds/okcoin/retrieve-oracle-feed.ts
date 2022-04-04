import fetch from "node-fetch";
import { IOraclePriceFeed } from "../../clients";
import { OKCOIN_ENDPOINT } from "../../const";
import { convertSig } from "../../utils";
import { OkCoinOracleResponse } from "./types";

export async function retrieveOKCoinOracleFeed(): Promise<IOraclePriceFeed[]> {
  const result = await fetch(OKCOIN_ENDPOINT);
  const json = (await result.json()) as OkCoinOracleResponse;
  const feed: IOraclePriceFeed[] = [];
  for (let i = 0; i < json.messages.length; i++) {
    feed.push({
      source: "okcoin",
      payload: Buffer.from(json.messages[i].slice(2), "hex"),
      signature: convertSig(json.signatures[i]),
    });
  }
  return feed;
}
