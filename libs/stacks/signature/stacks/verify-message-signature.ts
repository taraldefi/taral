import { Signature, verify } from "@noble/secp256k1";
import { VerifyMessageSignatureArgs } from "./types";
import { hashMessage, hexToBigInt, parseRecoverableSignature } from "./utils";

/**
 * Verify message signature with recoverable public key
 */
export function verifyMessageSignature({
  signature,
  message,
  publicKey,
}: VerifyMessageSignatureArgs): boolean {
  const { r, s } = parseRecoverableSignature(signature);
  const sig = new Signature(hexToBigInt(r), hexToBigInt(s));
  const hashedMsg =
    typeof message === "string" ? hashMessage(message) : message;
  return verify(sig, hashedMsg, publicKey);
}
