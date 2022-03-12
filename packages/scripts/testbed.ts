import * as btc from "bitcoinjs-lib";
import { address } from "bitcoinjs-lib";
import { getClarinetAccounts } from "lib-infra";
import { getRootDirectory, Logger } from "lib-shared";
import { decodeBtcAddress, getAddressHashMode } from "lib-bitcoin";

const NAME = "Testbed";

async function main() {
  const cwd = `${process.cwd()}`;
  console.log("Taral testbed");
  console.log("A place to quickly prototype and test things.");
  console.log(`Ran from ${cwd}`);

  // const root = `${getRootDirectory()}/packages/clarity`;
  // const contracts = await getClarinetAccounts(root);
  // Logger.debug(NAME, "Contracts are:", contracts);
  // const outputScript = address.toOutputScript(
  //   "mqVnk6NPRdhntvfm4hh9vvjiRkFDUuSYsH",
  //   btc.networks.regtest
  // );
  // Logger.debug(NAME, "Output script is:", outputScript.toString("hex"));

  const result = decodeBtcAddress('myfTfju9XSMRusaY2qTitSEMSchsWRA441');

  Logger.debug(NAME, "Decoded btc address: ", `0x${result.data.toString('hex')}`);
  Logger.debug("Decoded btc raw response", JSON.stringify(result));
}

main();
