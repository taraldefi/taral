import {
  IOraclePriceFeed,
  retrieveBinanceFeed,
  retrieveCoinbaseOracleFeed,
  retrieveOKCoinFeed,
  retrieveOKCoinOracleFeed,
} from "lib-oracle";
import {
  COINBASE_KEY,
  COINBASE_PASSPHRASE,
  COINBASE_SECRET,
  INFURA_API_URL,
  ORACLE_SK,
} from "../config";

export async function updatePricesCommand() {
  const coinbase_oracle_feed = await retrieveCoinbaseOracleFeed({
    coinbaseKey: COINBASE_KEY,
    coinbasePassPhrase: COINBASE_PASSPHRASE,
    coinbaseSecretKey: COINBASE_SECRET,
  });
  const okcoin_oracle_feed = await retrieveOKCoinOracleFeed();

  const binance_feed = await retrieveBinanceFeed({
    infuraApiKey: INFURA_API_URL,
    oracleSecretKey: ORACLE_SK,
  });

  const okcoin_feed = await retrieveOKCoinFeed({
    infuraApiKey: INFURA_API_URL,
    oracleSecretKey: ORACLE_SK,
  });

  const feed: IOraclePriceFeed[] = coinbase_oracle_feed.concat(
    okcoin_oracle_feed.concat(binance_feed.concat(okcoin_feed)),
  );

  console.log("feed", feed.length);
}
