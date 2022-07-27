import { readEncryptedFileWithEncoding } from "./storage/read-file";
import { syncWriteFileWithEncoding } from "./storage/write-pdf-file";
import {
  decryptString,
  ecPrivateKey,
  encryptString,
  getPublicKeyFromPrivate,
} from "lib-stacks";
import { PrivateKey } from "./storage/constants";

export async function storageMvp() {
  const file = "dummy.pdf";
  const encrypted = "encrypted-dummy.pdf";
  const privateKey = ecPrivateKey(PrivateKey);
  const publicKey = getPublicKeyFromPrivate(privateKey);

  const fileContent = readEncryptedFileWithEncoding(file, "binary");

  // encrypt

  const encryptedContent = await encryptString(publicKey, fileContent);
  syncWriteFileWithEncoding(encrypted, encryptedContent, "utf8");

  // decrypt
  const readEncryptedContent = readEncryptedFileWithEncoding(encrypted, "utf8");
  const decryptedContent = await decryptString(
    privateKey,
    readEncryptedContent
  );

  syncWriteFileWithEncoding(file, decryptedContent, "binary");
}
