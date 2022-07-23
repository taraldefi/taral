import { Address, AddressVersion, StacksMessageType } from "./types";

export function addressFromVersionHash(
    version: AddressVersion,
    hash: string
): Address {
    return { type: StacksMessageType.Address, version, hash160: hash };
}
