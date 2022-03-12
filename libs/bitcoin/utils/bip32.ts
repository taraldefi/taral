import BIP32Factory from 'bip32';
import * as tiny from 'tiny-secp256k1';

// You must wrap a tiny-secp256k1 compatible implementation
export const bip32 = BIP32Factory(tiny);