import { MessageSignature, PubKeyEncoding } from "./types";
import { hexToBigInt, parseRecoverableSignature } from "./utils";
import {
  getPublicKey,
  getSharedSecret,
  Point,
  Signature,
  signSync,
  utils,
  verify,
} from "@noble/secp256k1";

export function publicKeyFromSignatureRsv(
  message: string,
  messageSignature: MessageSignature,
  pubKeyEncoding = PubKeyEncoding.Compressed
): string {
  const parsedSignature = parseRecoverableSignature(messageSignature.data);
  const signature = new Signature(
    hexToBigInt(parsedSignature.r),
    hexToBigInt(parsedSignature.s)
  );
  const point = Point.fromSignature(
    message,
    signature,
    parsedSignature.recoveryParam
  );
  const compressed = pubKeyEncoding === PubKeyEncoding.Compressed;
  return point.toHex(compressed);
}
