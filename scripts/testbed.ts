import * as stacksgen from "../clarity/lib/stacksgen";
import * as btc from "bitcoinjs-lib";
import { RPCClient } from "rpc-bitcoin";
import { Transaction } from "bitcore-lib";

async function main() {
  // var info = await stacksgen.generateKeys(
  //   "twice kind fence tip hidden tilt action fragile skin nothing glory cousin green tomorrow spring wrist shed math olympic multiply hip blue scout claw"
  // );

  // console.log(JSON.stringify(info));
  // const regtest = btc.networks.testnet;
  // const key = btc.ECPair.fromWIF(info.wif, regtest);
  // var infoinfo = { key, address: getKeyAddress(key) };
  // console.log(JSON.stringify(infoinfo));

  const rawTx = '02000000019e2b183cb820937b46def62790e643997a97ebe9637a1936daca12942286bc6a000000006b4830450221008c5f820550bc5d8dd72fabffbe0bcab0e82505bc5ac53ecd8e29c6b3fc0932ba0220195e5a33d6bbd2d8a9f9a78e7e23082694cca976e05bd7b642ecb1fd4ca2f897012103cd2cfdbd2ad9332828a7a13ef62cb999e063421c708e863a7ffed71fb61c88c9ffffffff0280969800000000001976a9146d78de7b0625dfbfc16c3a8a5735f6dc3dc3f2ce88ace03d6202000000001976a9147321b74e2b6a7e949e6c4ad313035b166509501788ac00000000';

  const transaction = new Transaction(rawTx);

  var inspect = transaction.inspect();

  console.log(inspect);

  transaction.inputs.forEach(element => {
    console.log('Input:');

    console.log(element.sequenceNumber);
    console.log(element.outputIndex);
    console.log(element.script.isWitnessPublicKeyHashOut());
    console.log(element.script.isPublicKeyHashOut());
    console.log(element.script.isPublicKeyHashIn());
    console.log(element.prevTxId.toString('hex'));
    console.log(element.output);
  });

  transaction.outputs.forEach(element => {
    console.log('Output: ');
    console.log(element.script.toHex());
    console.log(element.script.isWitnessPublicKeyHashOut());
    console.log(element.script.isPublicKeyHashOut());
    console.log(element.script.isPublicKeyHashIn());
    console.log(element.inspect());
  })
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
