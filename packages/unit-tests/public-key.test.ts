import {
  getAddressFromPublicKey,
  publicKeyFromPrivKey,
  TransactionVersion,
} from "lib-stacks";

test("Test public key generation", () => {
  // secret_key: 753b7cc01a1a2e86221266a154af739463fce51219d97e4f856cd7200c3bd2a601
  // stx_address: ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
  // btc_address: mqVnk6NPRdhntvfm4hh9vvjiRkFDUuSYsH

  const privateKey =
    "753b7cc01a1a2e86221266a154af739463fce51219d97e4f856cd7200c3bd2a601";

  const publicKeyResult = publicKeyFromPrivKey(privateKey);

  const publicKey = publicKeyResult.data.toString("hex");

  expect(publicKey).toEqual(
    "0390a5cac7c33fda49f70bc1b0866fa0ba7a9440d9de647fecb8132ceb76a94dfa",
  );

  const address = getAddressFromPublicKey(
    publicKeyResult.data,
    TransactionVersion.Testnet,
  );

  expect(address).toEqual("ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM");
}, 3000000);
