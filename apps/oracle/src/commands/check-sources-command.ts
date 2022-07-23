import { checkSource } from "lib-oracle";
import { Logger } from "lib-shared";
import { ORACLE_HELPER } from "../utils/contract-helper";

const LOGGER_CATEGORY = "check-sources-command";

export async function checkSourcesCommand() {
    const contract = await ORACLE_HELPER.buildOracleContract();

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
