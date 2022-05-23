import { getClarinetAccounts } from "lib-infra";
import { getRootDirectory } from "lib-shared";
import {
  createMessageSignature,
  createStacksPrivateKey,
  signWithKey,
  StacksPrivateKey,
  bytesToHex,
  utf8ToBytes,
  PubKeyEncoding,
  publicKeyFromPrivKey,
  getAddressFromPublicKey,
  TransactionVersion,
  hexToBytes,
  signatureVrsToRsv,
  publicKeyFromSignatureRsv,
  signMessageHashRsv,
  publicKeyFromSignatureVrs,
  verifyMessageSignatureRsv,
} from "lib-stacks";
import { Signature, verify } from "@noble/secp256k1";

export async function signature() {
  // ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
  // secret_key: 753b7cc01a1a2e86221266a154af739463fce51219d97e4f856cd7200c3bd2a601
  // stx_address: ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM

  const root = `${getRootDirectory()}/packages/clarity`;

  const contracts = await getClarinetAccounts(root);

  const deployerPrivateKey = contracts.deployer.privateKey;
  const publicKey = publicKeyFromPrivKey(deployerPrivateKey);

  const address = getAddressFromPublicKey(
    publicKey.data,
    TransactionVersion.Testnet
  );

  const stacksPrivateKey: StacksPrivateKey =
    createStacksPrivateKey(deployerPrivateKey);

  const messageHex = bytesToHex(utf8ToBytes(address));

  const signature = signMessageHashRsv({
    messageHash: messageHex,
    privateKey: stacksPrivateKey,
  });

  //   const compressedPubKeyFromSig = publicKeyFromSignatureVrs(
  //     messageHex,
  //     signature,
  //     PubKeyEncoding.Compressed
  //   );

  const result = verifyMessageSignatureRsv({
    message: messageHex,
    publicKey: publicKey.data.toString("hex"),
    signature: signature.data,
  });

  console.log(result);
  //   console.log(compressedPubKeyFromSig);
  console.log(publicKey.data.toString("hex"));
  //   console.log('public keys are equal ', compressedPubKeyFromSig === publicKey.data.toString('hex'))
}
