import {
    EncryptedFileResponse,
    ErrorResponse,
    RequestFileResponse,
    StorageApiBaseResponse,
} from "./models";

import fetch from "node-fetch";
import { createRequestFilePayload } from "./utils";

const REQUEST_MESSAGE = "REQUEST";

export interface IRequestFilePayload {
    baseUrl: string;
    fileId: string;
    privateKey: string;
}

export async function apiRequestFile(
    request: IRequestFilePayload
): Promise<StorageApiBaseResponse<RequestFileResponse>> {
    const requestOptions = createRequestFilePayload(request.fileId, REQUEST_MESSAGE, request.privateKey);

    try {
        const response = await fetch(getRequestFileUrl(request.baseUrl), requestOptions);

        if (response.ok) {
            const header = response.headers.get("Content-Disposition");
            const parts = header!.split(";");
            const fileName = parts[1].split("=")[1];

            const encryptedFile = (await response.json()) as EncryptedFileResponse;

            const requestFileResponse: RequestFileResponse = {
                encryptedFile,
                fileName: fileName.replace(/['"]+/g, ""),
            };

            return {
                hasError: false,
                result: requestFileResponse,
            };
        }

        const errorResult = (await response.json()) as ErrorResponse;
        return {
            hasError: true,
            error: errorResult,
        };
    } catch (error) {
        console.log("Error ", error);

        const errorResponse: ErrorResponse = {
            errors: {
                message: (error as any).message,
            },

            status: -1,
        };

        return {
            hasError: true,
            error: errorResponse,
        };
    }
}

function getRequestFileUrl(baseUrl: string): string {
    return `${baseUrl}/api/v1/files/request-file`;
}