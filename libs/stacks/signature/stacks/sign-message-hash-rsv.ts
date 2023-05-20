import { createHash } from "crypto";
import { signWithKey } from "./sign-with-key";
import { MessageSignature, StacksPrivateKey } from "./types";
import { signatureVrsToRsv } from "./utils";

const ascii_message_prefix = "Stacks Signed Message: ";

/**
 * Signs a message using a private key. The resulting signature along with the
 * original message can be verified using {@link verifyMessageSignature}
 * @returns a recoverable signature (in RSV order)
 */
export function signMessageHashRsv({
    message,
    privateKey,
}: {
    message: string;
    privateKey: StacksPrivateKey;
}): MessageSignature {
    const hash = hashStacksMessage({ message });

    const messageSignature = signWithKey(privateKey, hash);
    return {
        ...messageSignature,
        data: signatureVrsToRsv(messageSignature.data),
    };
}

export function hashStacksMessage({ message }: { message: string }) {
    const hash = createHash("sha256")
        .update(Buffer.from(`${ascii_message_prefix}${message}`, "ascii"))
        .digest();

    return hash.toString("hex");
}
