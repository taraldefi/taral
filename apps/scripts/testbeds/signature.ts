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

// const ascii_message_prefix = "Stacks Signed Message: ";

// function signMessageForVerification(
//   private_key: StacksPrivateKey,
//   message: string
// ): Buffer {
//   const hash = createHash("sha256")
//     .update(Buffer.from(`${ascii_message_prefix}${message}`, "ascii"))
//     .digest();
//   const data = signWithKey(private_key, hash.toString("hex")).data;
//   // signWithKey returns a signature in vrs order, Clarity requires rsv.
//   return Buffer.from(data.slice(2) + data.slice(0, 2), "hex");
// }

export function signature() {
  const deployerPrivateKey =
    "753b7cc01a1a2e86221266a154af739463fce51219d97e4f856cd7200c3bd2a601";
  const publicKey = publicKeyFromPrivKey(deployerPrivateKey);

  const stacksPrivateKey: StacksPrivateKey =
    createStacksPrivateKey(deployerPrivateKey);

  const messageRaw =
    "e2d0fe1585a63ec6009c8016ff8dda8b17719a637405a4e23c0ff81339148249";

  const messageHex = hashStacksMessage({ message: messageRaw });

  const signature = signMessageHashRsv({
    message: messageRaw,
    privateKey: stacksPrivateKey,
  });

  const compressedPubKeyFromSig = publicKeyFromSignatureVrs(
    messageHex,
    signature,
    PubKeyEncoding.Compressed,
  );

  console.log("Compressed public key from signature ", compressedPubKeyFromSig);
  console.log(
    "Equality between keys",
    compressedPubKeyFromSig === publicKey.data.toString("hex"),
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
    hexToBigInt(s),
  );

  const nobleVerify = verify(
    nobleSignature,
    messageHex,
    compressedPubKeyFromSig,
    {
      strict: true,
    },
  );

  const addressFromPublicKey = getAddressFromPublicKey(
    compressedPubKeyFromSig,
    TransactionVersion.Testnet,
  );

  // const simpleSignatureBuffer = signMessageForVerification(
  //   stacksPrivateKey,
  //   messageRaw
  // );

  console.log("Noble signature verification: ", nobleVerify);
  // console.log("Simple signature: ", simpleSignatureBuffer.toString("hex"));
  console.log("Signature verification: ", result);
  console.log("Noble signature: ", nobleSignature.toCompactHex());
  console.log("Noble (der) signature hex: ", nobleSignature.toDERHex(true));
  console.log(publicKey.data.toString("hex"));
  console.log("Signature: ", signature.data);
  console.log("Message hex: ", messageHex);
  console.log(addressFromPublicKey);
}
