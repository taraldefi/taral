export function hexStringToUint8Array(hexString: string): Uint8Array {
  // Ensure the input string is hex-encoded (starts with '0x') and remove the '0x' if present
  if (hexString.startsWith("0x")) {
    hexString = hexString.slice(2);
  }

  // Check if the string is of even length, each byte consists of 2 hex characters
  if (hexString.length % 2 !== 0) {
    throw new Error("Invalid hex string");
  }

  // Create a new Uint8Array with the length of half the hex string length
  const byteArray = new Uint8Array(hexString.length / 2);

  // Loop through each pair of characters (1 byte)
  for (let i = 0, j = 0; i < hexString.length; i += 2, j++) {
    // Parse each hex byte (2 hex characters) to an integer and assign to Uint8Array
    byteArray[j] = parseInt(hexString.substring(i, i + 2), 16);
  }

  return byteArray;
}

// Example usage:
//   const hexBufferString = '0xb337c28c30846620599f060577db352cd66b3a6cc2fd4812388c519a30a1d33b';
//   const uint8Array = hexStringToUint8Array(hexBufferString);
//   console.log(uint8Array);
