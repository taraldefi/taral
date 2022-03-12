import * as ecPair from 'ecpair';

// You need to provide the ECC library. The ECC library must implement 
// all the methods of the `TinySecp256k1Interface` interface.
const tinysecp: ecPair.TinySecp256k1Interface = require('tiny-secp256k1');
export const ECPair: ecPair.ECPairAPI = ecPair.ECPairFactory(tinysecp);