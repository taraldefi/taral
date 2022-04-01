import Binance from "node-binance-api";
const binance = new Binance().options();
// {
//   APIKEY: '<key>',
//   APISECRET: '<secret>'
// }

import { buildPayload, signPayload } from "../../utils";
import { ORACLE_SK } from "../../config.js";
import { BINANCE_FILTER } from "./filter";

interface IBinanceFilter {
  symbol: string;
  decimals: number;
}

type Filter = { [key: string]: IBinanceFilter };

export async function retrieveBinanceFeed() {
  const ticker = await binance.prices();
  // console.log(ticker)
  const timestamp = Math.floor(Date.now() / 1000);

  const feed = [];
  const src = "artifix-binance";
  const keys = Object.keys(BINANCE_FILTER);

  for (let key of keys) {
    var filterItem = BINANCE_FILTER[key];
    // console.log(`${filter[key].symbol} ${parseFloat(ticker[key])} ${parseFloat(ticker[key]) * filter[key].decimals}`)
    const msg = buildPayload(
      timestamp,
      filterItem.symbol,
      Math.floor(parseFloat(ticker[key]) * filterItem.decimals)
    );
    // console.log("msg", msg.toString('hex'))
    const sig = signPayload(msg, ORACLE_SK);
    // console.log("sig_binance", sig.toString('hex'))
    feed.push({ src, msg, sig });
  }

  return feed;
}
