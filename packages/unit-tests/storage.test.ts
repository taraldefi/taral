import * as crypto from "crypto";
import { readFileSync } from "fs";
import { getRootDirectory, txOk } from "lib-shared";
import {
  bytesToHex,
  createStacksPrivateKey,
  hashStacksMessage,
  PubKeyEncoding,
  publicKeyFromSignatureVrs,
  signMessageHashRsv,
  StacksPrivateKey,
  utf8ToBytes,
  verifyMessageSignatureRsv,
} from "lib-stacks";
import { clarinetAccounts, taralStorage } from "./jest-setup";

test("[File storage] - Can list file", async () => {
  const fileHash =
    "e2d0fe1585a63ec6009c8016ff8dda8b17719a637405a4e23c0ff81339148249";
  const deployer = clarinetAccounts.deployer;

  const onChainStorage = taralStorage(deployer);
  const deployerPrivateKey = clarinetAccounts.deployer.privateKey;
  const filename = "file.txt";

  const filePath = `${getRootDirectory()}/packages/unit-tests/${filename}`;

  const fileBuffer = readFileSync(filePath);
  const hashSum = crypto.createHash("sha256");
  hashSum.update(fileBuffer);
  const hex = hashSum.digest("hex");

  console.log("This is the hex of the file ", hex);

  expect(hex.toString()).toEqual(fileHash);

  const signatureMessageHex = hashStacksMessage({
    message: hex,
  });

  const stacksPrivateKey: StacksPrivateKey =
    createStacksPrivateKey(deployerPrivateKey);

  const signature = signMessageHashRsv({
    message: hex,
    privateKey: stacksPrivateKey,
  });

  const compressedPubKeyFromSig = publicKeyFromSignatureVrs(
    signatureMessageHex,
    signature,
    PubKeyEncoding.Compressed
  );

  const signatureVerificationResult = verifyMessageSignatureRsv({
    message: Buffer.from(signatureMessageHex, "hex"),
    publicKey: compressedPubKeyFromSig,
    signature: signature.data,
  });

  expect(signatureVerificationResult).toBeTruthy();

  const signatureBuffer = Buffer.from(signature.data, "hex");
  const buffer = Buffer.from(utf8ToBytes(hex));

  const result = await txOk(
    onChainStorage.registerFile(filename, buffer, signatureBuffer)
  );

  expect(result.value).toEqual(1n);
});
