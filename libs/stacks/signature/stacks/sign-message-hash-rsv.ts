import { signWithKey } from "./sign-with-key";
import { MessageSignature, StacksPrivateKey } from "./types";
import { signatureVrsToRsv } from "./utils";

/**
 * Signs a message using a private key. The resulting signature along with the
 * original message can be verified using {@link verifyMessageSignature}
 * @returns a recoverable signature (in RSV order)
 */
export function signMessageHashRsv({
  messageHash,
  privateKey,
}: {
  messageHash: string;
  privateKey: StacksPrivateKey;
}): MessageSignature {
  const messageSignature = signWithKey(privateKey, messageHash);
  return {
    ...messageSignature,
    data: signatureVrsToRsv(messageSignature.data),
  };
}
