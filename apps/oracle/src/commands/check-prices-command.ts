import { getPrice } from "lib-oracle";
import { Logger } from "lib-shared";
import { ORACLE_HELPER } from "../utils/contract-helper";

const LOGGER_CATEGORY = "check-price-command";

async function checkPrice(source: string, symbol: string) {
  const contract = await ORACLE_HELPER.buildOracleContract();

  const getPriceResult = await getPrice({
    contract,
    source,
    symbol,
  });

  if (getPriceResult != null) {
    Logger.info(
      LOGGER_CATEGORY,
      `Result for checking the price for (${source}/${symbol})`,
    );
    Logger.info(
      LOGGER_CATEGORY,
      `Amount: ${getPriceResult.amount} | Timestamp: ${getPriceResult.timestamp} | Height: ${getPriceResult.height}`,
    );
  } else {
    Logger.error(
      LOGGER_CATEGORY,
      `Could not get the price for (${source}/${symbol})`,
    );
  }
}

export async function checkPricesCommand() {
  await checkPrice("artifix-okcoin", "TEST");

  await checkPrice("coinbase", "BTC");
  await checkPrice("coinbase", "ETH");
  await checkPrice("coinbase", "UNI");
  await checkPrice("coinbase", "SNX");

  await checkPrice("okcoin", "BTC");
  await checkPrice("okcoin", "ETH");

  await checkPrice("artifix-okcoin", "BTC");
  await checkPrice("artifix-okcoin", "ETH");
  await checkPrice("artifix-okcoin", "STX-BTC");
  await checkPrice("artifix-okcoin", "STX");
  await checkPrice("artifix-okcoin", "UNI");
  await checkPrice("artifix-binance", "STX-BTC");
  await checkPrice("artifix-binance", "STX-USDT");
  await checkPrice("artifix-binance", "UNI-BTC");
}
