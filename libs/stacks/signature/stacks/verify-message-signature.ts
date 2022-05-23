import { hashMessage, hexToBigInt, parseRecoverableSignature } from "./utils";
import {
  getPublicKey,
  getSharedSecret,
  Point,
  Signature,
  signSync,
  utils,
  verify,
} from "@noble/secp256k1";
import { VerifyMessageSignatureArgs } from "./types";

/**
 * Verify message signature with recoverable public key
 */
export function verifyMessageSignature({
  signature,
  message,
  publicKey,
}: VerifyMessageSignatureArgs): boolean {
  // todo: remove method and pull body to `verifyMessageSignatureRsv`
  const { r, s } = parseRecoverableSignature(signature);
  const sig = new Signature(hexToBigInt(r), hexToBigInt(s));
  const hashedMsg =
    typeof message === "string" ? hashMessage(message) : message;
  return verify(sig, hashedMsg, publicKey);
}
