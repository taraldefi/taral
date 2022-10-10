import { IOraclePriceFeed } from "../../clients";
import { buildPayload } from "../../utils";
import { signPayload } from "../../utils/sign-payload";
import { IOkCoinFeedRequest } from "../types";
import { fetchInstruments } from "./fetch-instruments";
import { OKCOIN_FILTER } from "./filter";
import { OkCoinInstruments } from "./types";

export async function retrieveOKCoinFeed(
  request: IOkCoinFeedRequest
): Promise<IOraclePriceFeed[]> {
  const timestamp = Math.floor(Date.now() / 1000);
  const instruments = await fetchInstruments();

  const feed: IOraclePriceFeed[] = [];
  const src = "artifix-okcoin";
  const keys = Object.keys(OKCOIN_FILTER);

  for (const key of keys) {
    const pair = getPair(key, instruments);
    if (!pair) {
      console.log("key not found", key);
    }

    // console.log(`====> ${filter[key].symbol} ${midPrice(pair)} ${midPrice(pair) * filter[key].decimals}`)
    const msg = buildPayload(
      timestamp,
      OKCOIN_FILTER[key].symbol,
      Math.floor(midPrice(pair!) * OKCOIN_FILTER[key].decimals)
    );
    // console.log("msg", msg.toString('hex'))
    const sig = signPayload({
      infuraApiUrl: request.infuraApiKey,
      payload: msg,
      secretKey: request.oracleSecretKey,
    });

    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    console.log(msg.toString('hex'));
    console.log(sig.toString('hex'));

    feed.push({
      source: src,
      payload: msg,
      signature: sig,
    });
  }

  return feed;
}

function getPair(ticker: string, data: OkCoinInstruments[]) {
  return data.find((pair) => pair.instrument_id === ticker);
}

function midPrice(pair: OkCoinInstruments) {
  return (parseFloat(pair.best_ask) + parseFloat(pair.best_bid)) / 2;
}
