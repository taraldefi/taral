import { getSharedSecret } from "@noble/secp256k1";
import { FailedDecryptionError } from "@stacks/common";
import { hexToBytes } from "../signature";
import { concatBytes } from "../utils";
import { createCipher } from "./aes";
import { CipherObject } from "./types";
import { createHmacSha256, equalConstTime, sharedSecretToKeys } from "./utils";

/**
 * Decrypts data encrypted with `encryptContent` with the
 * transit private key.
 * @param {String|Buffer} content - encrypted content.
 * @param {Object} [options=null] - options object
 * @param {String} options.privateKey - the hex string of the ECDSA private
 * key to use for decryption. If not provided, will use user's appPrivateKey.
 * @return {String|Buffer} decrypted content.
 */
export function decryptContent(
  content: string,
  options?: {
    privateKey?: string;
  }
): Promise<string | Buffer> {
  const opts = Object.assign({}, options);
  if (!opts.privateKey) {
    throw new Error("Private key is required for decryption.");
  }

  try {
    const cipherObject = JSON.parse(content);
    return decryptECIES(opts.privateKey, cipherObject);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new Error(
        "Failed to parse encrypted content JSON. The content may not " +
          "be encrypted. If using getFile, try passing { decrypt: false }."
      );
    } else {
      throw err;
    }
  }
}

/**
 * Decrypt content encrypted using ECIES
 * @param {String} privateKey - secp256k1 private key hex string
 * @param {Object} cipherObject - object to decrypt, should contain:
 *  iv (initialization vector), cipherText (cipher text),
 *  mac (message authentication code), ephemeralPublicKey
 *  wasString (boolean indicating with or not to return a buffer or string on decrypt)
 * @return {Buffer} plaintext
 * @throws {FailedDecryptionError} if unable to decrypt
 * @private
 * @ignore
 */
export async function decryptECIES(
  privateKey: string,
  cipherObject: CipherObject
): Promise<Buffer | string> {
  if (!cipherObject.ephemeralPK) {
    throw new FailedDecryptionError(
      "Unable to get public key from cipher object. " +
        "You might be trying to decrypt an unencrypted object."
    );
  }
  const ephemeralPK = cipherObject.ephemeralPK;
  let sharedSecret = getSharedSecret(privateKey, ephemeralPK, true);
  // Trim the compressed mode prefix byte
  sharedSecret = sharedSecret.slice(1);
  const sharedKeys = sharedSecretToKeys(Buffer.from(sharedSecret));
  const ivBuffer = hexToBytes(cipherObject.iv);

  let cipherTextBuffer: Buffer;

  if (
    !cipherObject.cipherTextEncoding ||
    cipherObject.cipherTextEncoding === "hex"
  ) {
    cipherTextBuffer = Buffer.from(cipherObject.cipherText, "hex");
  } else if (cipherObject.cipherTextEncoding === "base64") {
    cipherTextBuffer = Buffer.from(cipherObject.cipherText, "base64");
  } else {
    throw new Error(
      `Unexpected cipherTextEncoding "${cipherObject.cipherText}"`
    );
  }

  const macData = concatBytes(
    ivBuffer,
    hexToBytes(ephemeralPK),
    cipherTextBuffer
  );
  const actualMac = await hmacSha256(sharedKeys.hmacKey, Buffer.from(macData));
  const expectedMac = hexToBytes(cipherObject.mac);

  if (!equalConstTime(Buffer.from(expectedMac), actualMac)) {
    throw new FailedDecryptionError("Decryption failed: failure in MAC check");
  }
  const plainText = await aes256CbcDecrypt(
    Buffer.from(ivBuffer),
    sharedKeys.encryptionKey,
    cipherTextBuffer
  );

  if (cipherObject.wasString) {
    return plainText.toString();
  } else {
    return plainText;
  }
}

/**
 * @ignore
 */
async function hmacSha256(key: Buffer, content: Buffer) {
  const hmacSha256 = await createHmacSha256();
  return hmacSha256.digest(key, content);
}

/**
 * @ignore
 */
async function aes256CbcDecrypt(
  iv: Buffer,
  key: Buffer,
  ciphertext: Buffer
): Promise<Buffer> {
  const cipher = await createCipher();
  const result = await cipher.decrypt("aes-256-cbc", key, iv, ciphertext);
  return result;
}
