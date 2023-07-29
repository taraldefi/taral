import { Signature, verify } from "@noble/secp256k1";
import {
  createStacksPrivateKey,
  getAddressFromPublicKey,
  hashStacksMessage,
  hexToBigInt,
  parseRecoverableSignature,
  PubKeyEncoding,
  publicKeyFromPrivKey,
  publicKeyFromSignatureVrs,
  signatureRsvToVrs,
  signMessageHashRsv,
  StacksPrivateKey,
  TransactionVersion,
  verifyMessageSignatureRsv,
} from "lib-stacks";
import { clarinetAccounts } from "./jest-setup";

test("Signature verification successful", () => {
  const message = "Hello world";
  const deployerPrivateKey = clarinetAccounts.deployer.privateKey;
  const publicKey = publicKeyFromPrivKey(deployerPrivateKey);

  const stacksPrivateKey: StacksPrivateKey =
    createStacksPrivateKey(deployerPrivateKey);

  const messageHex = hashStacksMessage({ message });

  const signature = signMessageHashRsv({
    message: message,
    privateKey: stacksPrivateKey,
  });

  const compressedPubKeyFromSig = publicKeyFromSignatureVrs(
    messageHex,
    signature,
    PubKeyEncoding.Compressed
  );

  expect(compressedPubKeyFromSig).toEqual(publicKey.data.toString("hex"));

  const signatureVerificationResult = verifyMessageSignatureRsv({
    message: Buffer.from(messageHex, "hex"),
    publicKey: compressedPubKeyFromSig,
    signature: signature.data,
  });

  expect(signatureVerificationResult).toBeTruthy();

  const { r, s } = parseRecoverableSignature(signatureRsvToVrs(signature.data));

  const nobleSignature: Signature = new Signature(
    hexToBigInt(r),
    hexToBigInt(s)
  );

  const nobleSignatureVerificationResult = verify(
    nobleSignature,
    messageHex,
    compressedPubKeyFromSig,
    {
      strict: true,
    }
  );

  expect(nobleSignatureVerificationResult).toBeTruthy();

  const addressFromPublicKey = getAddressFromPublicKey(
    compressedPubKeyFromSig,
    TransactionVersion.Testnet
  );

  expect(addressFromPublicKey).toEqual(clarinetAccounts.deployer.address);

  console.log(JSON.stringify(signature));
}, 3000000);
