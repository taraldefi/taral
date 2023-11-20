import { getAddressFromPublicKey } from "./address-from-public-key";
import { publicKeyFromPrivKey } from "./public-key-from-private-key";
import { TransactionVersion } from "./types";

export function getAddressFromPrivateKey(
  /** Private key buffer or hex string */
  privateKey: string | Buffer,
  transactionVersion = TransactionVersion.Mainnet,
): string {
  const pubKey = publicKeyFromPrivKey(privateKey);
  return getAddressFromPublicKey(pubKey.data, transactionVersion);
}
