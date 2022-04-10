import { getDeployerPublicKey } from "./testbeds/public-key-testbed";
const NAME = "Testbed";

async function main() {
  const cwd = `${process.cwd()}`;
  console.log("Taral testbed");
  console.log("A place to quickly prototype and test things.");
  console.log(`Ran from ${cwd}`);

  // const root = `${getRootDirectory()}/packages/clarity`;
  // const contracts = await getClarinetAccounts(root);
  // Logger.debug(NAME, "Contracts are:", contracts);
  // const result = decodeBtcAddress("mqVnk6NPRdhntvfm4hh9vvjiRkFDUuSYsH");

  // Logger.debug(
  //   NAME,
  //   "Decoded btc address: ",
  //   `0x${result.data.toString("hex")}`
  // );
  // Logger.debug("Decoded btc raw response", JSON.stringify(result));

  // const outputScript = address.toOutputScript(
  //   "mqVnk6NPRdhntvfm4hh9vvjiRkFDUuSYsH",
  //   btc.networks.regtest
  // );
  // Logger.debug(NAME, "Output script is:", outputScript.toString("hex"));

  // const result = decodeStxAddress("ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM");

  // Logger.debug(
  //   NAME,
  //   "Decoded stx address: ",
  //   `0x${result.data.toString("hex")}` // 0x6d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce
  // );

  await getDeployerPublicKey();
}

main();
