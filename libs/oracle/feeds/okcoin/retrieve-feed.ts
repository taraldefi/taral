import { IOraclePriceFeed } from "../../clients";
import { ORACLE_SK } from "../../config";
import { buildPayload } from "../../utils";
import { signPayload } from "../../utils/sign-payload";
import { fetchInstruments } from "./fetch-instruments";
import { OKCOIN_FILTER } from "./filter";
import { OkCoinInstruments } from "./types";

export async function retrieveOKCoinFeed(): Promise<IOraclePriceFeed[]> {
  const timestamp = Math.floor(Date.now() / 1000);
  const instruments = await fetchInstruments();
  // const stx_usd = getPair('STX-USD', instruments)
  // const stx_btc = getPair('STX-BTC', instruments)
  // const btc_usd = getPair('BTC-USD', instruments)
  // console.log(`okcoin:  stx-usd ${midPrice(stx_usd)}`)
  // console.log(`okcoin:  stx-btc ${midPrice(stx_btc)}`)
  // console.log(`okcoin:  btc-usd ${midPrice(btc_usd)}`)

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
    const sig = signPayload(msg, ORACLE_SK);
    // console.log("sig_okcoin", sig.toString('hex'))
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
