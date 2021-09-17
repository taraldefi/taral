import * as btc from "bitcoinjs-lib";
import { address } from "bitcoinjs-lib";
import { getClarinetAccounts, getRootDirectory } from "taral-shared";

async function main() {
    const cwd = `${process.cwd()}`;
    console.log('Taral testned 1.0');
    console.log('A place to quickly prototype and test things.');
    console.log(`Ran from ${cwd}`);

    const root = `${getRootDirectory()}/packages/clarity`;
    const contracts = await getClarinetAccounts(root);

    console.log(JSON.stringify(contracts));

    const outputScript = address.toOutputScript(
        "mqVnk6NPRdhntvfm4hh9vvjiRkFDUuSYsH",
        btc.networks.regtest
    );

    console.log(outputScript.toString("hex"));
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
