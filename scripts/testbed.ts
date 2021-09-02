import * as stacksgen from "../clarity/lib/stacksgen";
import * as btc from "bitcoinjs-lib";
import { RPCClient } from "rpc-bitcoin";

async function main() {
  var info = await stacksgen.generateKeys(
    "twice kind fence tip hidden tilt action fragile skin nothing glory cousin green tomorrow spring wrist shed math olympic multiply hip blue scout claw"
  );

  console.log(JSON.stringify(info));
  const regtest = btc.networks.testnet;
  const key = btc.ECPair.fromWIF(info.wif, regtest);
  var infoinfo = { key, address: getKeyAddress(key) };
  console.log(JSON.stringify(infoinfo));
}

export function getKeyAddress(key: btc.ECPairInterface): string {
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
