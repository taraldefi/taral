import * as stacksgen from "taral-shared";
import * as btc from "bitcoinjs-lib";
import { address } from "bitcoinjs-lib";

async function main() {
  console.log('Taral testbed. A place to quickly prototype and test things.');
  
  const outputScript = address.toOutputScript(
    "mqVnk6NPRdhntvfm4hh9vvjiRkFDUuSYsH",
    btc.networks.regtest
  );

  console.log(outputScript.toString("hex"));
}

async function walletFromMnemonic() {
  var info = await stacksgen.generateKeys(
    "twice kind fence tip hidden tilt action fragile skin nothing glory cousin green tomorrow spring wrist shed math olympic multiply hip blue scout claw"
  );

  console.log(JSON.stringify(info));
  const regtest = btc.networks.testnet;
  const key = btc.ECPair.fromWIF(info.wif, regtest);
  var infoinfo = { key, address: getKeyAddress(key) };
  console.log(JSON.stringify(infoinfo));
}

function getKeyAddress(key: btc.ECPairInterface): string {
  const { address } = btc.payments.p2pkh({
    pubkey: key.publicKey,
    network: key.network,
  });
  if (!address) {
    throw new Error("address generation failed");
  }
  return address;
}

main();
