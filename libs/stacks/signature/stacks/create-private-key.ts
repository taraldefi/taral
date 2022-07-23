import { StacksPrivateKey } from "./types";

export function createStacksPrivateKey(key: string | Buffer): StacksPrivateKey {
    const data = typeof key === "string" ? Buffer.from(key, "hex") : key;
    let compressed: boolean;
    if (data.length === 33) {
        if (data[data.length - 1] !== 1) {
            throw new Error(
                "Improperly formatted private-key. 33 byte length usually " +
                "indicates compressed key, but last byte must be == 0x01"
            );
        }
        compressed = true;
    } else if (data.length === 32) {
        compressed = false;
    } else {
        throw new Error(
            `Improperly formatted private-key hex string: length should be 32 or 33 bytes, provided with length ${data.length}`
        );
    }
    return { data, compressed };
}
