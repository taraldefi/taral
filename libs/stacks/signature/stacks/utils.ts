import { Address, StacksPublicKey } from "./types";
import { c32address } from "c32check";
import RIPEMD160 from "ripemd160-min";
import { sha256 } from "sha.js";
import { StacksMessageType } from "./types";

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
