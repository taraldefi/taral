import fetch from "node-fetch";
import { CreateFileResponse } from "./storage/models";
import { createFormPayload } from './storage/create-file-payload';

export async function storageManualTest() {

    const response = await createFile();

    if (response == null) {
        console.log('Errored out');
    } else {
        console.log('Success', JSON.stringify(response));
    }
}

export async function createFile(): Promise<CreateFileResponse | null> {
    const requestOptions = createFormPayload();
    try {
        const response = await fetch(`http://localhost:3000/api/v1/files/create-file`, requestOptions);

        const result = await response.json() as CreateFileResponse;

        return result;
    } catch (error) {
        console.log("Error ", error);

        return null;
    }
}
