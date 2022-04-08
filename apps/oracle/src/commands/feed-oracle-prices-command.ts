import { readFileSync, writeFileSync } from "fs";
import {
  addPrices,
  IOraclePriceFeed,
  retrieveBinanceFeed,
  retrieveCoinbaseOracleFeed,
  retrieveOKCoinFeed,
  retrieveOKCoinOracleFeed,
} from "lib-oracle";

import {
  ORACLE_STX,
  STACKS_API_URL,
  COINBASE_KEY,
  COINBASE_PASSPHRASE,
  COINBASE_SECRET,
  INFURA_API_URL,
  ORACLE_SK,
} from "../config";

import { Logger } from "lib-shared";
import { timeout } from "lib-stacks";
import { ORACLE_HELPER } from "../utils/contract-helper";

const LOGGER_CATEGORY = "feed-prices-command";

export async function getNonce() {
  console.log("getNonce for", ORACLE_STX);
  const result = await fetch(
    `${STACKS_API_URL}/v2/accounts/${ORACLE_STX}?proof=0`
  );
  const value = await result.json();
  // console.log("value", value)
  return value.nonce;
}

export async function feedOraclePricesCommand() {
  const filename = "./nonce.json";
  const past_data_json: string = readFileSync(filename, "utf8");
  const past_data = JSON.parse(past_data_json);

  let nonce = await getNonce();
  console.log("nonce", nonce, "past_data.nonce", past_data.nonce);
  Logger.info(
    LOGGER_CATEGORY,
    `Nonce processing: (nonce: ${nonce} | past_data.nonce: ${past_data.nonce})`
  );

  while (nonce < past_data.nonce) {
    await timeout(1000 * 60); // 1 minute
    nonce = await getNonce();
  }

  const contract = await ORACLE_HELPER.buildOracleContract();

  while (true) {
    const coinbase_oracle_feed = await retrieveCoinbaseOracleFeed({
      coinbaseKey: COINBASE_KEY,
      coinbasePassPhrase: COINBASE_PASSPHRASE,
      coinbaseSecretKey: COINBASE_SECRET,
    });

    const okcoin_oracle_feed = await retrieveOKCoinOracleFeed();

    const binance_feed = await retrieveBinanceFeed({
      infuraApiKey: INFURA_API_URL,
      oracleSignKey: ORACLE_SK,
    });

    const okcoin_feed = await retrieveOKCoinFeed({
      infuraApiKey: INFURA_API_URL,
      oracleSignKey: ORACLE_SK,
    });

    const feed: IOraclePriceFeed[] = coinbase_oracle_feed.concat(
      okcoin_oracle_feed.concat(binance_feed.concat(okcoin_feed))
    );

    console.log("feed", feed.length);
    const result = await addPrices({
      contract,
      priceFeed: feed,
    });

    writeFileSync(
      filename,
      JSON.stringify(
        {
          nonce: nonce + 1,
        },
        null,
        2
      )
    );

    let next_nonce = await getNonce();

    // TODO(psq): check for > instead, caching can be bad with this LB
    while (next_nonce <= nonce) {
      console.log("next_nonce", next_nonce, "nonce", nonce);
      await timeout(1000 * 60); // 1 minute
      next_nonce = await getNonce();
    }
    nonce = next_nonce;
    console.log("new nonce", nonce);
  }
}
