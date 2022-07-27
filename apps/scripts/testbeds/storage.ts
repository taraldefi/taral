import fetch from "node-fetch";
import { CreateFileResponse, RequestFileResponse } from "./storage/models";
import { createFormPayload } from './storage/create-file-payload';
import { sign } from "./storage/signature-payload";

export async function storageManualTest() {
    const response = await createFile();

    if (response == null) {
        console.log('Errored out');
    } else {
        console.log('Success', JSON.stringify(response));
    }

    const fileResponse = await requestFile(response!.id);
    
    if (response == null) {
        console.log('Errored out');
    } else {
        console.log('Success', JSON.stringify(fileResponse));
    }
}

export async function requestFile(id: number): Promise<RequestFileResponse | null> {
    const signature = sign();

    const body = {
        externalId: String(id),
        signedMessage: signature.message,
        signature: signature.data
    };

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    }

    try {
        const response = await fetch(`http://localhost:3000/api/v1/files/request-file`, requestOptions);

        const result = await response.json() as RequestFileResponse;

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
