import { VerifyMessageSignatureArgs } from "./types";
import { signatureRsvToVrs } from "./utils";
import { verifyMessageSignature } from "./verify-message-signature";

/**
 * Verifies a Clarity compatible signed message using a public key. The
 * `signature` option needs to be in RSV format.
 */
export function verifyMessageSignatureRsv({
  signature,
  message,
  publicKey,
}: VerifyMessageSignatureArgs): boolean {
  return verifyMessageSignature({
    signature: signatureRsvToVrs(signature),
    message,
    publicKey,
  });
}
