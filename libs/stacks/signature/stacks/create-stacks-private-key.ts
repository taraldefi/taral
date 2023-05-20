import { PRIVATE_KEY_COMPRESSED_LENGTH } from "@stacks/common";
import { privateKeyToBuffer } from "./private-key-to-buffer";
import { StacksPrivateKey } from "./types";

export function createStacksPrivateKey(key: string | Buffer): StacksPrivateKey {
    const data = privateKeyToBuffer(key);
    const compressed = data.length == PRIVATE_KEY_COMPRESSED_LENGTH;
    return { data, compressed };
}
