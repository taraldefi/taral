const hexes = Array.from({ length: 256 }, (_, i) =>
  i.toString(16).padStart(2, "0")
);

/**
 * Converts bytes to the equivalent hex string
 * @example
 * ```
 * bytesToHex(Uint8Array.from([0xde, 0xad, 0xbe, 0xef])) // 'deadbeef'
 * ```
 */
export function bytesToHex(uint8a: Uint8Array): string {
  // pre-caching improves the speed 6x
  if (!(uint8a instanceof Uint8Array)) throw new Error("Uint8Array expected");
  let hex = "";
  for (const u of uint8a) {
    hex += hexes[u];
  }
  return hex;
}

/**
 * Converts a hex string to the equivalent bytes
 * @example
 * ```
 * hexToBytes('deadbeef') // Uint8Array(4) [ 222, 173, 190, 239 ]
 * ```
 */
export function hexToBytes(hex: string): Uint8Array {
  if (typeof hex !== "string") {
    throw new TypeError(`hexToBytes: expected string, got ${typeof hex}`);
  }
  const paddedHex = hex.length % 2 ? `0${hex}` : hex; // left pad with a zero if odd length
  const array = new Uint8Array(paddedHex.length / 2);
  for (let i = 0; i < array.length; i++) {
    const j = i * 2;
    const hexByte = paddedHex.slice(j, j + 2);
    const byte = Number.parseInt(hexByte, 16);
    if (Number.isNaN(byte) || byte < 0)
      throw new Error("Invalid byte sequence");
    array[i] = byte;
  }
  return array;
}

/**
 * Converts an ASCII string to the equivalent bytes
 * @example
 * ```
 * asciiToBytes('stacks $'); // Uint8Array(8) [ 115, 116, 97, 99, 107, 115, 32, 36 ]
 * ```
 */
export function asciiToBytes(str: string) {
  const byteArray = [];
  for (let i = 0; i < str.length; i++) {
    byteArray.push(str.charCodeAt(i) & 0xff); // ignore second bytes of UTF-16 character
  }
  return new Uint8Array(byteArray);
}

/**
 * Converts bytes to the equivalent ASCII string
 * @example
 * ```
 * bytesToAscii(Uint8Array.from([115, 116, 97, 99, 107, 115, 32, 36])); // 'stacks $'
 * ```
 */
export function bytesToAscii(arr: Uint8Array) {
  return String.fromCharCode.apply(null, arr as any as number[]);
}
