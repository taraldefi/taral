import { clarinetAccounts, deployer } from "./jest-setup";
import {
  decryptContent,
  ecPrivateKey,
  encryptContent,
  getPublicKeyFromPrivate,
} from "lib-stacks";
import { PRIVATE_KEY_UNCOMPRESSED_LENGTH } from "@stacks/common";

test("Encryption tests", async () => {
  const content = "Test encryption";

  const deployerPrivateKey = clarinetAccounts.deployer.privateKey;
  const privateKey = ecPrivateKey(deployerPrivateKey);
  expect(privateKey.length).toEqual(PRIVATE_KEY_UNCOMPRESSED_LENGTH * 2);

  const publicKey = getPublicKeyFromPrivate(privateKey);

  const encryptedContent = await encryptContent(content, {
    privateKey: privateKey,
    publicKey: publicKey,
    cipherTextEncoding: "base64",
    wasString: true,
    sign: false,
  });

  const decryptedContent = await decryptContent(encryptedContent, {
    privateKey: privateKey,
  });

  expect(decryptedContent).toEqual(content);
});
