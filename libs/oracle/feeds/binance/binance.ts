import Binance from "node-binance-api";
import { IOraclePriceFeed } from "../../clients";
// {
//   APIKEY: '<key>',
//   APISECRET: '<secret>'
// }
import { buildPayload, signPayload } from "../../utils";
import { IBinanceFeedRequest } from "../types";
import { BINANCE_FILTER } from "./filter";
const binance = new Binance().options();

export async function retrieveBinanceFeed(
  request: IBinanceFeedRequest
): Promise<IOraclePriceFeed[]> {
  const ticker = await binance.prices();
  // console.log(ticker)
  const timestamp = Math.floor(Date.now() / 1000);

  const feed: IOraclePriceFeed[] = [];
  const src = "artifix-binance";
  const keys = Object.keys(BINANCE_FILTER);

  for (const key of keys) {
    const filterItem = BINANCE_FILTER[key];
    // console.log(`${filter[key].symbol} ${parseFloat(ticker[key])} ${parseFloat(ticker[key]) * filter[key].decimals}`)
    const msg = buildPayload(
      timestamp,
      filterItem.symbol,
      Math.floor(parseFloat(ticker[key]) * filterItem.decimals)
    );
    // console.log("msg", msg.toString('hex'))
    const sig = signPayload({
      infuraApiUrl: request.infuraApiKey,
      payload: msg,
      secretKey: request.oracleSecretKey,
    });

    // console.log("sig_binance", sig.toString('hex'))
    feed.push({ source: src, payload: msg, signature: sig });
  }

  return feed;
}
