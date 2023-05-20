import { byteTable } from './constants';

export function decode(encoded: Buffer | string): Buffer {
  if (!Buffer.isBuffer(encoded) && typeof encoded !== 'string') {
    throw new TypeError(
      'base32.decode only takes Buffer or string as parameter',
    );
  }
  if (!Buffer.isBuffer(encoded)) {
    encoded = Buffer.from(encoded);
  }

  const decoded = Buffer.alloc(Math.ceil((encoded.length * 5) / 8));
  let shiftIndex = 0;
  let plainDigit = 0;
  let plainChar;
  let plainPos = 0;

  for (let i = 0; i < encoded.length; i++) {
    if (encoded[i] === 0x3d) {
      //'='
      break;
    }
    const encodedByte = encoded[i] - 0x30;
    if (encodedByte < byteTable.length) {
      plainDigit = byteTable[encodedByte];
      if (shiftIndex <= 3) {
        shiftIndex = (shiftIndex + 5) % 8;
        if (shiftIndex === 0) {
          plainChar |= plainDigit;
          decoded[plainPos] = plainChar;
          plainPos++;
          plainChar = 0;
        } else {
          plainChar |= 0xff & (plainDigit << (8 - shiftIndex));
        }
      } else {
        shiftIndex = (shiftIndex + 5) % 8;
        plainChar |= 0xff & (plainDigit >>> shiftIndex);
        decoded[plainPos] = plainChar;
        plainPos++;
        plainChar = 0xff & (plainDigit << (8 - shiftIndex));
      }
    } else {
      throw new Error('Invalid input - it is not base32 encoded string');
    }
  }
  return decoded.slice(0, plainPos);
}
