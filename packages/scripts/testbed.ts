import * as btc from "bitcoinjs-lib";
import { address } from "bitcoinjs-lib";
import { decodeBtcAddress } from "lib-bitcoin";
import { Logger } from "lib-shared";

const NAME = "Testbed";

async function main() {
  const cwd = `${process.cwd()}`;
  console.log("Taral testbed");
  console.log("A place to quickly prototype and test things.");
  console.log(`Ran from ${cwd}`);

  // const root = `${getRootDirectory()}/packages/clarity`;
  // const contracts = await getClarinetAccounts(root);
  // Logger.debug(NAME, "Contracts are:", contracts);
  const result = decodeBtcAddress("mqVnk6NPRdhntvfm4hh9vvjiRkFDUuSYsH");

  Logger.debug(
    NAME,
    "Decoded btc address: ",
    `0x${result.data.toString("hex")}`
  );
  Logger.debug("Decoded btc raw response", JSON.stringify(result));

  const outputScript = address.toOutputScript(
    "mqVnk6NPRdhntvfm4hh9vvjiRkFDUuSYsH",
    btc.networks.regtest
  );
  Logger.debug(NAME, "Output script is:", outputScript.toString("hex"));
}

main();
