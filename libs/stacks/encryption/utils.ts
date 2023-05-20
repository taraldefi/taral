import { signSync } from "@noble/secp256k1";
import { sha256, sha512 } from "sha.js";
import { bytesToHex, publicKeyFromPrivKey } from "../signature";
import { createCipher } from "./aes";
import { NodeCryptoHmacSha256, WebCryptoHmacSha256 } from "./hmac";
import { Hmac, NodeCryptoLib, WebCryptoLib } from "./types";

export const NO_CRYPTO_LIB =
    'Crypto lib not found. Either the WebCrypto "crypto.subtle" or Node.js "crypto" module must be available.';

export function isSubtleCryptoAvailable(): boolean {
    return typeof crypto !== "undefined" && typeof crypto.subtle !== "undefined";
}

export function hashSha256Sync(data: Buffer) {
    const hash = new sha256();
    hash.update(data);
    return hash.digest();
}

/**
 * Sign content using ECDSA
 *
 * @param {String} privateKey - secp256k1 private key hex string
 * @param {Object} content - content to sign
 * @return {Object} contains:
 * signature - Hex encoded DER signature
 * public key - Hex encoded private string taken from privateKey
 * @private
 * @ignore
 */
export function signECDSA(
    privateKey: string,
    content: string | Buffer
): {
    publicKey: string;
    signature: string;
} {
    const contentBuffer =
        content instanceof Buffer ? content : Buffer.from(content);
    const publicKey = publicKeyFromPrivKey(privateKey).data.toString("hex");
    const contentHash = hashSha256Sync(contentBuffer);
    const signature = signSync(contentHash, privateKey);

    return {
        signature: bytesToHex(signature),
        publicKey,
    };
}

/**
 * @ignore
 */
export async function hmacSha256(key: Buffer, content: Buffer) {
    const hmacSha256 = await createHmacSha256();
    return hmacSha256.digest(key, content);
}

/**
 * @ignore
 */
export async function aes256CbcDecrypt(
    iv: Buffer,
    key: Buffer,
    ciphertext: Buffer
): Promise<Buffer> {
    const cipher = await createCipher();
    const result = await cipher.decrypt("aes-256-cbc", key, iv, ciphertext);
    return result;
}

export async function createHmacSha256(): Promise<Hmac> {
    const cryptoLib = await getCryptoLib();
    if (cryptoLib.name === "subtleCrypto") {
        return new WebCryptoHmacSha256(cryptoLib.lib);
    } else {
        return new NodeCryptoHmacSha256(cryptoLib.lib.createHmac);
    }
}

// Make async for future version which may lazy load.
// eslint-disable-next-line @typescript-eslint/require-await
export async function getCryptoLib(): Promise<WebCryptoLib | NodeCryptoLib> {
    if (isSubtleCryptoAvailable()) {
        return {
            lib: crypto.subtle,
            name: "subtleCrypto",
        };
    } else {
        try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const nodeCrypto = require("crypto") as typeof import("crypto");
            return {
                lib: nodeCrypto,
                name: "nodeCrypto",
            };
        } catch (error) {
            throw new Error(NO_CRYPTO_LIB);
        }
    }
}

/**
 * @ignore
 */
export function sharedSecretToKeys(sharedSecret: Buffer): {
    encryptionKey: Buffer;
    hmacKey: Buffer;
} {
    // generate mac and encryption key from shared secret
    const hashedSecret = hashSha512Sync(sharedSecret);
    return {
        encryptionKey: hashedSecret.slice(0, 32),
        hmacKey: hashedSecret.slice(32),
    };
}

export function hashSha512Sync(data: Buffer) {
    const hash = new sha512();
    hash.update(data);
    return hash.digest();
}

/**
 * @ignore
 */
export function equalConstTime(b1: Buffer, b2: Buffer) {
    if (b1.length !== b2.length) {
        return false;
    }
    let res = 0;
    for (let i = 0; i < b1.length; i++) {
        res |= b1[i] ^ b2[i]; // jshint ignore:line
    }
    return res === 0;
}

/**
 * @ignore
 */
export async function aes256CbcEncrypt(
    iv: Buffer,
    key: Buffer,
    plaintext: Buffer
): Promise<Buffer> {
    const cipher = await createCipher();
    const result = await cipher.encrypt("aes-256-cbc", key, iv, plaintext);
    return result;
}
