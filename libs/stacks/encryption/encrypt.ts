import { getPublicKey, getSharedSecret, utils } from "@noble/secp256k1";
import { bytesToHex } from "../signature";
import {
  concatBytes,
  getPublicKeyFromPrivate,
  isValidPublicKey,
} from "../utils";
import {
  CipherObject,
  CipherTextEncoding,
  EncryptContentOptions,
  SignedCipherObject,
} from "./types";
import {
  aes256CbcEncrypt,
  hmacSha256,
  sharedSecretToKeys,
  signECDSA,
} from "./utils";

/**
 * Encrypts the data provided with the app public key.
 * @param {String|Buffer} content - data to encrypt
 * @param {Object} [options=null] - options object
 * @param {String} options.publicKey - the hex string of the ECDSA public
 * key to use for encryption. If not provided, will use user's appPublicKey.
 * @return {String} Stringified ciphertext object
 */
export async function encryptContent(
  content: string | Buffer,
  options?: EncryptContentOptions,
): Promise<string> {
  const opts = Object.assign({}, options);
  let privateKey: string | undefined;
  if (!opts.publicKey) {
    if (!opts.privateKey) {
      throw new Error(
        "Either public key or private key must be supplied for encryption.",
      );
    }
    opts.publicKey = getPublicKeyFromPrivate(opts.privateKey);
  }
  let wasString: boolean;
  if (typeof opts.wasString === "boolean") {
    wasString = opts.wasString;
  } else {
    wasString = typeof content === "string";
  }
  const contentBuffer =
    typeof content === "string" ? Buffer.from(content) : content;
  const cipherObject = await encryptECIES(
    opts.publicKey,
    contentBuffer,
    wasString,
    opts.cipherTextEncoding,
  );
  let cipherPayload = JSON.stringify(cipherObject);
  if (opts.sign) {
    if (typeof opts.sign === "string") {
      privateKey = opts.sign;
    } else if (!privateKey) {
      privateKey = opts.privateKey;
    }
    const signatureObject = signECDSA(privateKey!, cipherPayload);
    const signedCipherObject: SignedCipherObject = {
      signature: signatureObject.signature,
      publicKey: signatureObject.publicKey,
      cipherText: cipherPayload,
    };
    cipherPayload = JSON.stringify(signedCipherObject);
  }
  return cipherPayload;
}

/**
 * Encrypt content to elliptic curve publicKey using ECIES
 * @param publicKey - secp256k1 public key hex string
 * @param content - content to encrypt
 * @return Object containing:
 *  iv (initialization vector, hex encoding),
 *  cipherText (cipher text either hex or base64 encoded),
 *  mac (message authentication code, hex encoded),
 *  ephemeral public key (hex encoded),
 *  wasString (boolean indicating with or not to return a buffer or string on decrypt)
 * @private
 * @ignore
 */
async function encryptECIES(
  publicKey: string,
  content: Buffer,
  wasString: boolean,
  cipherTextEncoding?: CipherTextEncoding,
): Promise<CipherObject> {
  const validity = isValidPublicKey(publicKey);
  if (!validity.result) {
    throw validity;
  }
  const ephemeralPrivateKey = utils.randomPrivateKey();
  const ephemeralPublicKey = getPublicKey(ephemeralPrivateKey, true);
  let sharedSecret = getSharedSecret(ephemeralPrivateKey, publicKey, true);
  // Trim the compressed mode prefix byte
  sharedSecret = sharedSecret.slice(1);
  const sharedKeys = sharedSecretToKeys(Buffer.from(sharedSecret));
  const initializationVector = utils.randomBytes(16);

  const cipherText = await aes256CbcEncrypt(
    Buffer.from(initializationVector),
    sharedKeys.encryptionKey,
    content,
  );

  const macData = concatBytes(
    initializationVector,
    ephemeralPublicKey,
    cipherText,
  );
  const mac = await hmacSha256(sharedKeys.hmacKey, Buffer.from(macData));

  let cipherTextString: string;

  if (!cipherTextEncoding || cipherTextEncoding === "hex") {
    cipherTextString = bytesToHex(cipherText);
  } else if (cipherTextEncoding === "base64") {
    cipherTextString = cipherText.toString("base64");
  } else {
    throw new Error(`Unexpected cipherTextEncoding "${cipherTextEncoding}"`);
  }

  const result: CipherObject = {
    iv: bytesToHex(initializationVector),
    ephemeralPK: bytesToHex(ephemeralPublicKey),
    cipherText: cipherTextString,
    mac: bytesToHex(mac),
    wasString,
  };
  if (cipherTextEncoding && cipherTextEncoding !== "hex") {
    result.cipherTextEncoding = cipherTextEncoding;
  }
  return result;
}
