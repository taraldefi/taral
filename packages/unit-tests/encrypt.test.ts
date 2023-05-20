import { PRIVATE_KEY_UNCOMPRESSED_LENGTH } from "@stacks/common";
import {
    decryptString,
    ecPrivateKey,
    encryptString,
    getPublicKeyFromPrivate
} from "lib-stacks";
import { deployer } from "./jest-setup";

test("Encryption tests", async () => {
    const content = "Test encryption";
    const deployerPrivateKey = deployer.privateKey;
    const privateKey = ecPrivateKey(deployerPrivateKey);
    expect(privateKey.length).toEqual(PRIVATE_KEY_UNCOMPRESSED_LENGTH * 2);

    const publicKey = getPublicKeyFromPrivate(privateKey);

    const encryptedContent = await encryptString(publicKey, content);
    const decryptedContent = await decryptString(privateKey, encryptedContent);

    expect(decryptedContent).toEqual(content);
});
