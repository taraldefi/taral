import { RECOVERABLE_ECDSA_SIG_LENGTH_BYTES } from "./constants";
import { MessageSignature, StacksMessageType } from "./types";

export function createMessageSignature(signature: string): MessageSignature {
    const length = Buffer.from(signature, "hex").byteLength;
    if (length != RECOVERABLE_ECDSA_SIG_LENGTH_BYTES) {
        throw Error("Invalid signature");
    }

    return {
        type: StacksMessageType.MessageSignature,
        data: signature,
    };
}
