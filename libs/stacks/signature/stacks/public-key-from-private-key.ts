import { ec as EC } from "elliptic";
import { createStacksPrivateKey } from "./create-private-key";
import { StacksPublicKey } from "./types";
import { createStacksPublicKey } from "./utils";

export function publicKeyFromPrivKey(
  privateKey: string | Buffer
): StacksPublicKey {
  const privKey = createStacksPrivateKey(privateKey);
  const ec = new EC("secp256k1");
  const keyPair = ec.keyFromPrivate(
    privKey.data.toString("hex").slice(0, 64),
    "hex"
  );
  const pubKey = keyPair.getPublic(privKey.compressed, "hex");
  return createStacksPublicKey(pubKey);
}
