import { checkSource } from "lib-oracle";
import { Logger } from "lib-shared";
import { getOracleContract } from "../utils/contracts";

const LOGGER_CATEGORY = "add-source-command";

export async function addSourceCommand() {
  const oracleContractInfo = await getOracleContract();
  const oracleContract = oracleContractInfo.contract;
  const account = oracleContractInfo.account;

  const contract = oracleContract.contract(account);

  const coinbaseSource = await checkSource({
    source: "coinbase",
    contract: contract,
  });

  const okCoinSource = await checkSource({
    source: "okcoin",
    contract: contract,
  });

  const artifixOkCoinSource = await checkSource({
    source: "artifix-okcoin",
    contract: contract,
  });

  const artifixBinanceSource = await checkSource({
    source: "artifix-binance",
    contract: contract,
  });

  const test1Source = await checkSource({
    source: "test1",
    contract: contract,
  });

  const test2Source = await checkSource({
    source: "test2",
    contract: contract,
  });

  Logger.info(LOGGER_CATEGORY, "coinbase", coinbaseSource);
  Logger.info(LOGGER_CATEGORY, "okcoin", okCoinSource);
  Logger.info(LOGGER_CATEGORY, "artifix-okcoin", artifixOkCoinSource);
  Logger.info(LOGGER_CATEGORY, "artifix-binance", artifixBinanceSource);
  Logger.info(LOGGER_CATEGORY, "test1", test1Source);
  Logger.info(LOGGER_CATEGORY, "test2", test2Source);
}
