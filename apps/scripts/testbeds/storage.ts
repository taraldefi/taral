import { decryptString, ecPrivateKey } from "lib-stacks";
import { PrivateKey } from "./storage/constants";
import { StorageApiClient } from "./storage/storage-api-client";
import { readTestFile, syncWriteFileWithEncoding } from "./storage/files";

export async function storageManualTest() {
  const storage: StorageApiClient = new StorageApiClient(
    "http://localhost:3000",
    PrivateKey
  );

  const fileInfo = readTestFile();

  const result = await storage.createFile(
    fileInfo.file,
    fileInfo.fileSizeInBytes
  );

  if (result.hasError) {
    console.log(
      "Failed to create file with error: ",
      result.error?.errors.message
    );

    return;
  }

  const requestFileResult = await storage.requestFile(result.result?.id!);

  if (requestFileResult.hasError) {
    console.log(
      "Failed to request file with error: ",
      requestFileResult.error?.errors.message
    );
  }

  const encryptedContent = JSON.stringify(
    requestFileResult.result?.encryptedFile
  );

  const privateKey = ecPrivateKey(PrivateKey);

  const decryptedContent = await decryptString(privateKey, encryptedContent);

  var buffer = Buffer.from(decryptedContent, "binary");

  syncWriteFileWithEncoding(
    requestFileResult.result?.fileName!,
    buffer,
    "binary"
  );

  console.log("Success");
}
