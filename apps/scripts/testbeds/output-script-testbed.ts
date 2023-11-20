import * as btc from "bitcoinjs-lib";
import { address } from "bitcoinjs-lib";
import { decodeBtcAddress } from "lib-bitcoin";
import { Logger } from "lib-shared";

const LOGGER_CATEGORY = "GET_OUTPUT_SCRIPT";

export function getOutputScript() {
  const result = decodeBtcAddress("mqVnk6NPRdhntvfm4hh9vvjiRkFDUuSYsH");

  Logger.debug(
    LOGGER_CATEGORY,
    "Decoded btc address: ",
    `0x${result.data.toString("hex")}`,
  );
  Logger.debug("Decoded btc raw response", JSON.stringify(result));

  const outputScript = address.toOutputScript(
    "mqVnk6NPRdhntvfm4hh9vvjiRkFDUuSYsH",
    btc.networks.regtest,
  );
  Logger.debug(
    LOGGER_CATEGORY,
    "Output script is:",
    outputScript.toString("hex"),
  );
}
