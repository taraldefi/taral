import { decryptContent } from "./decrypt";
import { encryptContent } from "./encrypt";
import { CipherTextEncoding } from "./types";

const CIPHER_TEXT_ENCODING: CipherTextEncoding = "base64";
const SIGN = false;

export async function encryptString(
    publicKey: string,
    content: string
): Promise<string> {
    const encryptedContent = await encryptContent(content, {
        publicKey: publicKey,
        cipherTextEncoding: CIPHER_TEXT_ENCODING,
        sign: SIGN,
        wasString: true,
    });

    return encryptedContent;
}

export async function decryptString(
    privateKey: string,
    encryptedContent: string
): Promise<string> {
    const decryptedContent = await decryptContent(encryptedContent, {
        privateKey: privateKey,
    });

    return decryptedContent as string;
}
