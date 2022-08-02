import { decryptString, ecPrivateKey } from "lib-stacks";
import { PrivateKey } from "./storage/constants";
import { StorageApiClient } from "lib-storage";
import { readTestFile, syncWriteFileWithEncoding } from "./storage/files";
import { request } from "http";

export async function storageManualTest(updateFile: boolean = false) {
  const storage: StorageApiClient = new StorageApiClient(
    "http://localhost:3000",
    PrivateKey
  );

  const firstVersionFilename = "dummy.pdf";
  const secondVersionFilename = "dummy-edited.pdf";
  

  const fileInfo = readTestFile(firstVersionFilename);

  const result = await storage.createFile(
    "dummy.pdf",
    fileInfo.file,
    fileInfo.fileSizeInBytes
  );

  if (result.hasError) {
    console.log(JSON.stringify(result));
    console.log(
      "Failed to create file with error: ",
      result.error?.errors.message
    );

    return;
  }

  const fileId = result.result?.id!;

  await requestFile(storage, fileId, "first-version.pdf");

  if (updateFile) {
    const secondVersionFileInfo = readTestFile(secondVersionFilename);
    const updateResult = await storage.updateFile(result.result?.id!, secondVersionFileInfo.file, secondVersionFileInfo.fileSizeInBytes);

    if (updateResult.hasError) {
      console.log(JSON.stringify(updateResult));
      console.log(
        "Failed to update file with error: ",
        updateResult.error?.errors.message
      );
  
      return;
    }

    await requestFile(storage, fileId, "second-version.pdf");
  }

  console.log("Success");
}

async function requestFile(storage: StorageApiClient, id: string, fileName: string) {
  const requestFileResult = await storage.requestFile(id);

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
    fileName,
    buffer,
    "binary"
  );

}
