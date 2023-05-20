import { getPublicKey as nobleGetPublicKey } from "@noble/secp256k1";
import { ec as EC } from "elliptic";
import { bytesToHex } from "lib-shared";
import { createStacksPrivateKey } from "./create-private-key";
import { StacksPublicKey } from "./types";
import { createStacksPublicKey } from "./utils";

export function publicKeyFromPrivKey(
    privateKey: string | Uint8Array
): StacksPublicKey {
    const privKey = createStacksPrivateKey(privateKey);
    const publicKey = nobleGetPublicKey(
        privKey.data.slice(0, 32),
        privKey.compressed
    );
    return createStacksPublicKey(bytesToHex(publicKey));
}

export function ecPrivateKey(privateKey: string | Buffer) {
    const privKey = createStacksPrivateKey(privateKey);
    const ec = new EC("secp256k1");
    const keyPair = ec.keyFromPrivate(
        bytesToHex(privKey.data).slice(0, 64),
        "hex"
    );

    const ecPrivateKey = keyPair.getPrivate().toString("hex");

    return ecPrivateKey;
}
