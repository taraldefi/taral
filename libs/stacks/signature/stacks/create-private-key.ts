import { hexToBytes } from "lib-shared";
import { StacksPrivateKey } from "./types";

export const PRIVATE_KEY_COMPRESSED_LENGTH = 33;

export function createStacksPrivateKey(
  key: string | Uint8Array
): StacksPrivateKey {
  const data = privateKeyToBytes(key);
  const compressed = data.length == PRIVATE_KEY_COMPRESSED_LENGTH;
  return { data, compressed };
}

/**
 * @private
 * @ignore
 */
export function privateKeyToBytes(privateKey: string | Uint8Array): Uint8Array {
  const privateKeyBuffer =
    typeof privateKey === "string" ? hexToBytes(privateKey) : privateKey;

  if (privateKeyBuffer.length != 32 && privateKeyBuffer.length != 33) {
    throw new Error(
      `Improperly formatted private-key. Private-key byte length should be 32 or 33. Length provided: ${privateKeyBuffer.length}`
    );
  }

  if (privateKeyBuffer.length == 33 && privateKeyBuffer[32] !== 1) {
    throw new Error(
      "Improperly formatted private-key. 33 bytes indicate compressed key, but the last byte must be == 01"
    );
  }

  return privateKeyBuffer;
}
