import { charTable } from './constants';
import { quintetCount } from './utils';

export function encode(plain: Buffer | string): Buffer {
  if (!Buffer.isBuffer(plain) && typeof plain !== 'string') {
    throw new TypeError(
      'base32.encode only takes Buffer or string as parameter',
    );
  }
  if (!Buffer.isBuffer(plain)) {
    plain = Buffer.from(plain);
  }

  let i = 0;
  let j = 0;
  let shiftIndex = 0;
  let digit = 0;
  const encoded = Buffer.alloc(quintetCount(plain) * 8);

  while (i < plain.length) {
    const current = plain[i];

    if (shiftIndex > 3) {
      digit = current & (0xff >> shiftIndex);
      shiftIndex = (shiftIndex + 5) % 8;
      digit =
        (digit << shiftIndex) |
        ((i + 1 < plain.length ? plain[i + 1] : 0) >> (8 - shiftIndex));
      i++;
    } else {
      digit = (current >> (8 - (shiftIndex + 5))) & 0x1f;
      shiftIndex = (shiftIndex + 5) % 8;
      if (shiftIndex === 0) i++;
    }

    encoded[j] = charTable.charCodeAt(digit);
    j++;
  }

  for (i = j; i < encoded.length; i++) {
    encoded[i] = 0x3d; //'='.charCodeAt(0)
  }

  return encoded;
}
