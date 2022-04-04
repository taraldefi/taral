import {
  addPrices,
  IOraclePriceFeed,
  retrieveBinanceFeed,
  retrieveCoinbaseOracleFeed,
  retrieveOKCoinFeed,
  retrieveOKCoinOracleFeed,
} from "lib-oracle";
import { ORACLE_HELPER } from "../utils/contract-helper";

export async function updatePricesCommand() {
  const coinbase_oracle_feed = await retrieveCoinbaseOracleFeed();
  const okcoin_oracle_feed = await retrieveOKCoinOracleFeed();
  const binance_feed = await retrieveBinanceFeed();
  const okcoin_feed = await retrieveOKCoinFeed();

  const feed: IOraclePriceFeed[] = coinbase_oracle_feed.concat(
    okcoin_oracle_feed.concat(binance_feed.concat(okcoin_feed))
  );

  const contract = await ORACLE_HELPER.buildOracleContract();

  console.log("feed", feed.length);
  const result = await addPrices({
    contract,
    priceFeed: feed,
  });
}
