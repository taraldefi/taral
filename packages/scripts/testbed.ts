import * as btc from "bitcoinjs-lib";
import { address } from "bitcoinjs-lib";
import { getClarinetAccounts, getRootDirectory, Logger } from "taral-shared";

const NAME = "Testbed";

async function main() {
  const cwd = `${process.cwd()}`;
  console.log("Taral testned 1.0");
  console.log("A place to quickly prototype and test things.");
  console.log(`Ran from ${cwd}`);

  const root = `${getRootDirectory()}/packages/clarity`;
  const contracts = await getClarinetAccounts(root);

  Logger.debug(NAME, "Contracts are:", contracts);

  const outputScript = address.toOutputScript(
    "mqVnk6NPRdhntvfm4hh9vvjiRkFDUuSYsH",
    btc.networks.regtest
  );

  Logger.debug(NAME, "Output script is:", outputScript.toString("hex"));
}

main();
