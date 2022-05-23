import { Signature, verify } from "@noble/secp256k1";
import { getClarinetAccounts } from "lib-infra";
import { getRootDirectory } from "lib-shared";
import {
  bytesToHex,
  createStacksPrivateKey,
  getAddressFromPublicKey,
  hexToBigInt,
  parseRecoverableSignature,
  PubKeyEncoding,
  publicKeyFromPrivKey,
  publicKeyFromSignatureVrs,
  signatureRsvToVrs,
  signMessageHashRsv,
  StacksPrivateKey,
  TransactionVersion,
  utf8ToBytes,
  verifyMessageSignatureRsv,
} from "lib-stacks";

export async function signature() {
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

  const compressedPubKeyFromSig = publicKeyFromSignatureVrs(
    messageHex,
    signature,
    PubKeyEncoding.Compressed
  );

  console.log("Compressed public key from signature ", compressedPubKeyFromSig);
  console.log(
    "Equality between keys",
    compressedPubKeyFromSig === publicKey.data.toString("hex")
  );

  const result = verifyMessageSignatureRsv({
    message: Buffer.from(messageHex, "hex"),
    publicKey: compressedPubKeyFromSig,
    signature: signature.data,
  });

  // todo: remove method and pull body to `verifyMessageSignatureRsv`
  const { r, s } = parseRecoverableSignature(signatureRsvToVrs(signature.data));

  const nobleSignature: Signature = new Signature(
    hexToBigInt(r),
    hexToBigInt(s)
  );

  const nobleVerify = verify(
    nobleSignature,
    messageHex,
    compressedPubKeyFromSig,
    {
      strict: true,
    }
  );

  const addressFromPublicKey = getAddressFromPublicKey(
    compressedPubKeyFromSig,
    TransactionVersion.Testnet
  );

  console.log("Noble signature verification: ", nobleVerify);
  console.log("Signature verification: ", result);
  console.log(publicKey.data.toString("hex"));
  console.log(addressFromPublicKey);
}
