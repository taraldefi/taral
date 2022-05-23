import { Address, StacksPublicKey } from "./types";
import { c32address } from "c32check";
import RIPEMD160 from "ripemd160-min";
import { sha256 } from "sha.js";
import { StacksMessageType } from "./types";
import { IntegerType, intToBigInt } from "@stacks/common";
import { encode, decode, encodingLength } from "varuint-bitcoin";
import { CHAIN_PREFIX, RECOVERABLE_ECDSA_SIG_LENGTH_BYTES } from "./constants";

// The following methods are based on `@noble/hashes` implementation
// https://github.com/paulmillr/noble-hashes
// Copyright (c) 2022 Paul Miller (https://paulmillr.com)
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the “Software”), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
const hexes = Array.from({ length: 256 }, (_, i) =>
  i.toString(16).padStart(2, "0")
);

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

export function hashMessage(message: string) {
  return new sha256().update(encodeMessage(message)).digest();
}

export function encodeMessage(message: string | Buffer): Buffer {
  const encoded = encode(Buffer.from(message).length);
  return Buffer.concat([
    Buffer.from(CHAIN_PREFIX),
    encoded,
    Buffer.from(message),
  ]);
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
    recoveryParam: hexToInt(recoveryParamHex),
    r,
    s,
  };
}

/**
 * Converts hex string to integer
 * @ignore
 */
export function hexToInt(hex: string): number {
  return parseInt(hex, 16);
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

export const leftPadHexToLength = (hexString: string, length: number): string =>
  hexString.padStart(length, "0");

/**
 * Converts IntegerType to hex string
 * @ignore
 */
export function intToHex(integer: IntegerType, lengthBytes = 8): string {
  const value =
    typeof integer === "bigint" ? integer : intToBigInt(integer, false);
  return value.toString(16).padStart(lengthBytes * 2, "0");
}

/**
 * @example hexToBytes('deadbeef')
 * @ignore
 */
export function hexToBytes(hex: string): Uint8Array {
  if (typeof hex !== "string") {
    throw new TypeError(`hexToBytes: expected string, got ${typeof hex}`);
  }
  if (hex.length % 2)
    throw new Error("hexToBytes: received invalid unpadded hex");
  const array = new Uint8Array(hex.length / 2);
  for (let i = 0; i < array.length; i++) {
    const j = i * 2;
    const hexByte = hex.slice(j, j + 2);
    const byte = Number.parseInt(hexByte, 16);
    if (Number.isNaN(byte) || byte < 0)
      throw new Error("Invalid byte sequence");
    array[i] = byte;
  }
  return array;
}

/** @ignore */
export function utf8ToBytes(str: string): Uint8Array {
  if (typeof str !== "string") {
    throw new TypeError(`utf8ToBytes expected string, got ${typeof str}`);
  }
  return new TextEncoder().encode(str);
}

export function bytesToHex(uint8a: Uint8Array): string {
  // pre-caching improves the speed 6x
  if (!(uint8a instanceof Uint8Array)) throw new Error("Uint8Array expected");
  let hex = "";
  for (let i = 0; i < uint8a.length; i++) {
    hex += hexes[uint8a[i]];
  }
  return hex;
}

/** @ignore */
export function signatureVrsToRsv(signature: string) {
  return signature.slice(2) + signature.slice(0, 2);
}

/** @ignore */
export function signatureRsvToVrs(signature: string) {
  return signature.slice(-2) + signature.slice(0, -2);
}
