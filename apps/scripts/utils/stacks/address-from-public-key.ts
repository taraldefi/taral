import { AddressHashMode, TransactionVersion } from "./types";

import { ec as EC } from "elliptic";
import { addressHashModeToVersion } from "./address-hash-mode-to-version";
import { addressFromVersionHash } from "./address-from-version-hash";
import { addressToString, hashP2PKH } from "./utils";

export function getAddressFromPublicKey(
  /** Public key buffer or hex string */
  publicKey: string | Buffer,
  transactionVersion = TransactionVersion.Mainnet
): string {
  publicKey =
    typeof publicKey === "string" ? publicKey : publicKey.toString("hex");
  const addrVer = addressHashModeToVersion(
    AddressHashMode.SerializeP2PKH,
    transactionVersion
  );
  const addr = addressFromVersionHash(
    addrVer,
    hashP2PKH(Buffer.from(publicKey, "hex"))
  );
  const addrString = addressToString(addr);
  return addrString;
}
