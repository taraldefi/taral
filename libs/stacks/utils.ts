import { getPublicKey as nobleGetPublicKey, Point } from "@noble/secp256k1";
import { StacksNetwork } from "@stacks/network";
import { getTransactionUrl } from "taral-configuration";
import { privateKeyToBuffer } from "./signature";
import { InvalidPublicKeyReason } from "./types";

export async function timeout(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getTransactionById(
  txId: string,
  network: StacksNetwork
): Promise<any> {
  const url = getTransactionUrl(txId, network);
  const result = await fetch(url);
  const value = await result.json();

  return value;
}

/**
 * Concats Uint8Array-s into one; like `Buffer.concat([buf1, buf2])`
 * @example concatBytes(buf1, buf2)
 * @ignore
 */
export function concatBytes(...arrays: Uint8Array[]): Uint8Array {
  if (!arrays.every((a) => a instanceof Uint8Array))
    throw new Error("Uint8Array list expected");
  if (arrays.length === 1) return arrays[0];
  const length = arrays.reduce((a, arr) => a + arr.length, 0);
  const result = new Uint8Array(length);
  for (let i = 0, pad = 0; i < arrays.length; i++) {
    const arr = arrays[i];
    result.set(arr, pad);
    pad += arr.length;
  }
  return result;
}

/**
 * @ignore
 */
export function allHexChars(maybe: string): boolean {
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  const reg: RegExp = /^[0-9a-f]+$/i;

  return reg.test(maybe);
}

/**
 * @ignore
 */
export function isValidPublicKey(pub: string): {
  result: boolean;
  reason: string | null;
  reason_data: string | null;
} {
  const invalidFormat = {
    result: false,
    reason_data: "Invalid public key format",
    reason: InvalidPublicKeyReason.InvalidFormat,
  };
  const invalidPoint = {
    result: false,
    reason_data: "Public key is not a point",
    reason: InvalidPublicKeyReason.IsNotPoint,
  };
  if (pub.length !== 66 && pub.length !== 130) return invalidFormat;

  const firstByte = pub.slice(0, 2);

  // uncompressed public key
  if (pub.length === 130 && firstByte !== "04") return invalidFormat;

  // compressed public key
  if (pub.length === 66 && firstByte !== "02" && firstByte !== "03")
    return invalidFormat;

  if (!allHexChars(pub)) return invalidFormat;

  try {
    // Converts public key to Point
    const point = Point.fromHex(pub);

    // Verify point on curve is valid if it conforms to equation
    // Validate the public key
    // Throws: Point is not on elliptic curve if point is not on curve
    point.assertValidity();

    // Validation passed
    return {
      result: true,
      reason_data: null,
      reason: null,
    };
  } catch (e) {
    return invalidPoint;
  }
}

/**
 * @ignore
 * @returns a compressed public key
 */
export function getPublicKeyFromPrivate(privateKey: string | Buffer) {
  const privateKeyBuffer = privateKeyToBuffer(privateKey);
  // for backwards compatibility we always return a compressed public key, regardless of private key mode
  return Buffer.from(
    nobleGetPublicKey(privateKeyBuffer.slice(0, 32), true)
  ).toString("hex");
}
