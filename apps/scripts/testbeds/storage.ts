import { decryptString, ecPrivateKey } from "lib-stacks";
import fetch from "node-fetch";
import { PrivateKey } from "./storage/constants";
import { createFormPayload } from "./storage/create-file-payload";
import {
  CreateFileResponse,
  EncryptedFileResponse,
  RequestFileResponse,
} from "./storage/models";
import { sign } from "./storage/signature-payload";
import { syncWriteFileWithEncoding } from "./storage/write-pdf-file";

export async function storageManualTest() {
  const response = await createFile();

  if (response == null) {
    console.log("Errored out");
  } else {
    console.log("Success", JSON.stringify(response));
  }

  const fileResponse = await requestFile(response!.id);

  if (fileResponse == null) {
    console.log("Errored out");
  } else {
    console.log("Success");

    const encryptedContent = JSON.stringify(fileResponse.encryptedFile);

    const privateKey = ecPrivateKey(PrivateKey);

    const decryptedContent = await decryptString(privateKey, encryptedContent);

    var buffer = Buffer.from(decryptedContent, "binary");

    syncWriteFileWithEncoding(fileResponse.fileName, buffer, "binary");
  }
}

export async function requestFile(
  id: string
): Promise<RequestFileResponse | null> {
  const signature = sign();

  const body = {
    externalId: String(id),
    signedMessage: signature.message,
    signature: signature.data,
  };

  const requestOptions = {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  };

  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/files/request-file`,
      requestOptions
    );

    const header = response.headers.get("Content-Disposition");
    const parts = header!.split(";");
    const fileName = parts[1].split("=")[1];
    const encryptedFile = (await response.json()) as EncryptedFileResponse;

    const result: RequestFileResponse = {
      encryptedFile,
      fileName: fileName.replace(/['"]+/g, ""),
    };

    return result;
  } catch (error) {
    console.log("Error ", error);

    return null;
  }
}

export async function createFile(): Promise<CreateFileResponse | null> {
  const requestOptions = createFormPayload();
  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/files/create-file`,
      requestOptions
    );

    const result = (await response.json()) as CreateFileResponse;

    return result;
  } catch (error) {
    console.log("Error ", error);

    return null;
  }
}
