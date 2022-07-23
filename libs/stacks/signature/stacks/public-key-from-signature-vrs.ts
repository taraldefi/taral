import { Point, Signature } from "@noble/secp256k1";
import { MessageSignature, PubKeyEncoding } from "./types";
import {
  hexToBigInt,
  parseRecoverableSignature,
  signatureRsvToVrs,
} from "./utils";

export function publicKeyFromSignatureVrs(
  message: string,
  messageSignature: MessageSignature,
  pubKeyEncoding = PubKeyEncoding.Compressed
): string {
  const parsedSignature = parseRecoverableSignature(
    signatureRsvToVrs(messageSignature.data)
  );
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
