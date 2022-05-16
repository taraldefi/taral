import { Address, StacksPublicKey } from "./types";
import { c32address } from "c32check";
import RIPEMD160 from "ripemd160-min";
import { sha256 } from "sha.js";
import { StacksMessageType } from "./types";

export const hexStringToInt = (hexString: string): number =>
  parseInt(hexString, 16);

export function addressToString(address: Address): string {
  return c32address(address.version, address.hash160).toString();
}

// Internally, the Stacks blockchain encodes address the same as Bitcoin
// single-sig address (p2pkh)
export const hashP2PKH = (input: Buffer): string => {
  return hash160(input).toString("hex");
};

export const hash160 = (input: Buffer): Buffer => {
  const sha256Result = new sha256().update(input).digest();
  return Buffer.from(new RIPEMD160().update(sha256Result).digest());
};

export function createStacksPublicKey(key: string): StacksPublicKey {
  return {
    type: StacksMessageType.PublicKey,
    data: Buffer.from(key, "hex"),
  };
}

export function parseRecoverableSignature(signature: string) {
  const coordinateValueBytes = 32;
  if (signature.length < coordinateValueBytes * 2 * 2 + 1) {
    throw new Error("Invalid signature");
  }
  const recoveryParamHex = signature.substr(0, 2);
  const r = signature.substr(2, coordinateValueBytes * 2);
  const s = signature.substr(
    2 + coordinateValueBytes * 2,
    coordinateValueBytes * 2
  );
  return {
    recoveryParam: hexStringToInt(recoveryParamHex),
    r,
    s,
  };
}

/**
 * Converts hex input string to bigint
 * @param hex - hex input string without 0x prefix and in big endian format
 * @example "6c7cde4d702830c1db34ef7c19e2776f59107afef39084776fc88bc78dbb9656"
 */
export function hexToBigInt(hex: string): bigint {
  if (typeof hex !== "string")
    throw new TypeError("hexToNumber: expected string, got " + typeof hex);
  // Big Endian
  return BigInt(`0x${hex}`);
}
